import * as express from 'express'
import * as admin from 'firebase-admin'

interface IRequest extends express.Request {
  user: {
    uid: string,
    email: string,
    role: string,
  }
}

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://craftycoder-e95a2.firebaseio.com',
})

const firestore = admin.firestore()
firestore.settings({ timestampsInSnapshots: true })
const db = admin.database()
const auth = admin.auth()

export default () => {
  const app = express()
  const cors = require('cors')({origin: true});
  app.use(cors);

  app.use(async (req: any, res, next) => {
    if (req.url.startsWith("/authenticated")) {
      const token = req.headers.authorization
      try {
        const { uid, email } = await auth.verifyIdToken(token)
        const snap = await firestore.collection('users').doc(uid).get()
        const user = snap.data()
        Object.assign(req, {
          user: {
            ...user,
            uid,
            email,
          }
        })
        next()
      } catch (e) {
        res.status(403).send("Unauthorized")
      }
    } else {
      next()
    }
  })

  app.get("/books/:wishlistId", async (req: IRequest, res: any) => {
    const parse = require('node-html-parser')
    const fetch = require('node-fetch')
    const { wishlistId } = req.params
    const { count, year }: any = req.query
    const countnum = parseInt(count);
    const booklist:any = [];
    let response = await fetch('https://www.amazon.com/hz/wishlist/ls/' + wishlistId + "?filter=DEFAULT&viewType=list&sort=default&type=wishlist&ajax=true", {method: 'GET'})
    let order = 0
    while (response !== undefined) {
      const body = await response.text()
      const root = parse.parse(body)
      const items = root.querySelectorAll('.g-item-sortable')
      items.forEach(async (element: any) => {
        const bookToAdd = {title:'', image: '', author: '', href: '', year, order: order++}
        const book = element.querySelectorAll('.g-itemImage')
        const bookcode = element.attributes["data-itemId"]
        const byline = element.querySelector('#item-byline-' + bookcode)
        bookToAdd.author = byline.text.replace('by ', '').replace(' (Kindle Edition)', '').replace(' (Paperback)', '').replace(' (Hardcover)', '')
        const href =  element.querySelector('#itemName_' + bookcode)
        bookToAdd.href = 'https://www.amazon.com' + href.attributes.href
        book.forEach((detail: any) => {
          const title = detail.querySelectorAll('.a-link-normal')
          title.forEach((links: any) => {
            if (
              links.attributes &&
              links.attributes.title && 
              links.childNodes &&
              links.childNodes[0] &&
              links.childNodes[0].attributes &&
              links.childNodes[0].attributes.src) {
                bookToAdd['title'] = links.attributes.title
                bookToAdd['image'] = links.childNodes[0].attributes.src
            }
          })
        })
        booklist.push(bookToAdd);
        await db.ref('/books/' + year + '/' + bookcode).update(bookToAdd)        
        await db.ref('/books/' + year + '/').orderByChild("after").startAt("0").on("child_added", async function(snapshot) {
          if (snapshot.val().after === bookcode) {
            await db.ref('/books/' + year + '/' + snapshot.key + '/order').set(bookToAdd.order-1)
          }          
        })
      })
      response = undefined
      if (countnum === 0 || (countnum > 0 && booklist.length < countnum)) {
        const seemore = root.querySelectorAll('.wl-see-more')
        if (seemore && seemore[0] && seemore[0].attributes && seemore[0].attributes.href) {
          response = await fetch('https://www.amazon.com' + seemore[0].attributes.href, {method: 'GET'})
        }
      }    
    }
    if (countnum > 0) {
      res.send(booklist.slice(0, countnum));
    } else {
      res.send(booklist)
    }
  })

  app.get("/authenticated/:postId", async (req: IRequest, res: any) => {
    const { uid } = req.user
    const { postId } = req.params
    const snaps = await firestore.collection('likes')
      .where('userId', '==', uid)
      .where('postId', '==', postId)
      .limit(1)
      .get()
    const result: { id?: string } = {}
    snaps.forEach(x => Object.assign(result, { ...x.data(), id: x.id }))
    if (result.id) {
      await firestore.collection('likes').doc(result.id).delete()
    }
    if (!result.id) {
      await firestore.collection('likes').doc().set({
        userId: uid,
        postId,
        createdAt: new Date(),
      })
    }
    res.sendStatus(204)
  })

  return app
}
