
import firebase_app from '@/firebase/config'
import { GoogleAuthProvider,GithubAuthProvider,getAuth,signInWithPopup,signOut } from "firebase/auth";
import { getDocs, getFirestore } from "firebase/firestore";

import { addDoc,collection } from "firebase/firestore"
const db=getFirestore(firebase_app)


const GoogleProvider = new GoogleAuthProvider();
const GithubProvider=new GithubAuthProvider();
const auth=getAuth(firebase_app)

export const SinginWithGoogle=()=>{
    signInWithPopup(auth,GoogleProvider).then(async(result)=>{
        console.log(result.user.uid)
        const response=await (await fetch('/api/handle-signin',{
            method:'POST',
            body:JSON.stringify(result.user.uid),
            headers:{
                'Content-Type':'application/json'
            }
        })).json()

        console.log(response)
        if(response.body){
            const userColRef=collection(db,'user')
            let users:any[]=[]
            await getDocs(userColRef).then((result)=>{
                result.docs.forEach((QuerySnapshot:any)=>{
                    console.log(QuerySnapshot.data())
                    users.push({...QuerySnapshot.data()})
                })
            }).catch((error)=>console.log(error))

            console.log(users)

            const isUserExist=users.filter((user)=>{
                console.log(user.uid,response.body)
                return user.uid==response.body
            })

            console.log(isUserExist)

            if(isUserExist.length==0){
                addDoc(userColRef,{
                    name:result.user.displayName,
                    image:result.user.photoURL,
                    email:result.user.email,
                    uid:result.user.uid
                }).then((resp)=>console.log('Added new user.')).catch((erro)=>console.log('Unable to add docs',erro))
            }


            if(typeof window !==undefined){
                window.localStorage.setItem('currentUser',JSON.stringify(response.body))
                window.location.reload()
            }
        }
    }).catch((error)=>{
        console.log(error)
    })
    
}

export const SignInWithGithub=()=>{
    signInWithPopup(auth,GithubProvider).then(async(result)=>{
        console.log(result.user.uid)
        const response=await (await fetch('/api/handle-signin',{
            method:'POST',
            body:JSON.stringify(result.user.uid),
            headers:{
                'Content-Type':'application/json'
            }
        })).json()

        console.log(response)
        if(response.body){
            const userColRef=collection(db,'user')
            let users:any[]=[]
            await getDocs(userColRef).then((result)=>{
                result.docs.forEach((QuerySnapshot:any)=>{
                    console.log(QuerySnapshot.data())
                    users.push({...QuerySnapshot.data()})
                })
            }).catch((error)=>console.log(error))

            console.log(users)

            const isUserExist=users.filter((user)=>{
                console.log(user.uid,response.body)
                return user.uid==response.body
            })

            console.log(isUserExist)

            if(isUserExist.length==0){
                addDoc(userColRef,{
                    name:result.user.displayName,
                    image:result.user.photoURL,
                    email:result.user.email,
                    uid:result.user.uid
                }).then((resp)=>console.log('Added new user.')).catch((erro)=>console.log('Unable to add docs',erro))
            }


            if(typeof window !==undefined){
                window.localStorage.setItem('currentUser',JSON.stringify(response.body))
                window.location.reload()
            }
        }
    }).catch((error)=>{
        console.log(error)
    })
    
}

export const Logout=()=>{
    signOut(auth).then(async(result)=>{
        const response=await (await fetch('/api/logout',{
            method:'POST',
            body:JSON.stringify({}),
            headers:{
                'Content-Type':'application/json'
            }
        })).json()

        console.log(response)
        if(response){
            if(typeof window !==undefined){
                window.localStorage.removeItem('currentUser')
                window.location.reload()
            }
        }

    }).catch((error)=>console.log(error))
}