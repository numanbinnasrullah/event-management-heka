import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {collection, getDocs,getDoc, addDoc, deleteDoc, doc, updateDoc, setDoc} from "firebase/firestore";
import {db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, storage, sendSignInLinkToEmail} from '../../Config/Firebase'

// Signup User Thunk
// export const addUser = createAsyncThunk("users/addUser", async (userData) => {
//   const {email, password, displayName} = userData;
 
//   console.log("Add user Thunk", userData);
//   try{
//     const authId = await createUserWithEmailAndPassword(auth, email, password);
//     const authData = {
//       displayName: displayName,
//       email: email,
//       password: password,
//       authid: authId.user.uid
//     }
//     await addDoc(collection(db, "users"), authData);
  
   
//     return authData;
//     }catch(error){
//       console.log(error.message)
//     }
//   });


  export const fetchUsers = createAsyncThunk("users/getUsers", async (uid) => {
    try{

        const docRef =  doc(db, "users", uid)
        const user = getDoc(docRef)
        .then((doc) => {
            if (doc.exists()) {
            console.log('User data:', doc.data());
            let currentUsser = doc.data().displayName
            return currentUsser
            } else {
            console.log('No such document!');
            }
        })
        return user



    //   const getUsers = await getDocs(collection(db, "users"));
    //   let usersList = []
    //   getUsers.forEach((doc) => {
    //       const user = {
    //           displayName: doc.data()?.displayName,
    //           email: doc.data()?.email,
    //           password: doc.data()?.password, 
    //           authid: doc.data().authid,
    //           dbid: doc.id
    //       }
    //       usersList.push(user);
    //   });
  }catch(error){
      console.log(error);
  }
   
  });



// Login User Thunk
//   export const userLogin = createAsyncThunk("users/userLogin", async (userData) => {
//     console.log("user sign in thunk", userData)
//     const {email, password} = userData;
//     await signInWithEmailAndPassword(auth, email, password);
    
    
//     // const docRef = doc(db, "users", state.id);
//     // setDoc(docRef, state)

//     return true   
//    })


//    export const LogoutUser = createAsyncThunk("users/logoutUser", async () => {
//     const logOut = signOut(auth)
//     console.log("Logout Successfully ", logOut)
//    })



export const userSlice = createSlice({
    name: "user",
    initialState: {
        users:[],
        currentUser:"",
        loginUser:"",
        loginStatus:false   
    },
    reducers:{
    },
    extraReducers: (builder) => {
        // builder.addCase(addUser.fulfilled, (state, action) => {
        //   console.log("add user reducer", action.payload);
        //   state.loginUser = action.payload
        // });


        builder.addCase(fetchUsers.fulfilled, (state, action) => {
          console.log("get User reducer", action.payload);
        //   state.loginUser = action.payload.authid
          state.currentUser = action.payload
          
        });


        // builder.addCase(userLogin.fulfilled, (state, action) => {
        //     console.log("user login reducer", action.payload);
        //     state.loginStatus = action.payload


        //   });
      },
})

// export const {addUser} = userSlice.actions;

export default userSlice.reducer;