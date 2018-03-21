import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

interface Post {
  title: string,
  content: string
}

interface PostID extends Post {
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  postCollection: AngularFirestoreCollection<Post>
  posts: any;
  title: string;
  content: string;
  singlePost: Post;
  postDoc: AngularFirestoreDocument<Post>;
  post: Post;

  constructor(private afs: AngularFirestore) {

  }

  ngOnInit() {
    //this.postCollection = this.afs.collection("posts", ref => ref.where('title', '==', 'test'))
    this.postCollection = this.afs.collection("posts")
    this.posts = this.postCollection.snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Post
          const id = action.payload.doc.id
          return { id, data }
        })
      })
  }

  addPost() {
    this.afs.collection("posts").add({ 'title': this.title, 'content': this.content })
  }

  getPost(id) {
    this.postDoc = this.afs.doc(`posts/${id}`);
    this.postDoc.valueChanges().subscribe((doc) => {
      this.post = doc
      console.log(this.post)
    })
  }

  deletePost(id) {
    this.afs.doc(`posts/${id}`).delete();
  }
}
