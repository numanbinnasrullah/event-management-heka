import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

import {db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, storage} from '../../config/firebase'



import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    setDoc
  } from "firebase/firestore";
  import {ref, deleteObject} from 'firebase/storage';
  


// First, create the thunk
export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      let eventList = [];
      querySnapshot.forEach((doc) => {
        eventList.push({
          title: doc.data()?.title,
          description: doc.data()?.description,
          date: doc.data()?.date,
          time: doc.data().time,
          location: doc.data().location,
          creator:doc.data().creator,
          status: doc.data().sttus,
          id: doc.id
        });
      });
  
      console.log("Fetch todo Thunk method . . .", eventList);
      return eventList;
    } catch (error) {
      console.log("================catch====================");
      console.log(error);
      console.log("====================================");
    }
  });

//   export const deleteTodos = createAsyncThunk('todos/deleteTodos',async (item)=>{
//     try {
//       const confirmed = window.confirm('Are you sure you want to delete this item?');
//       if (!confirmed) {
//         return null; // return null to indicate that no item was deleted
//       }
        
//         await deleteDoc(doc(db, "todos", item.id));
//         var imgRef = ref(storage, item.imgUrl);
//         await deleteObject(imgRef);
//         return item
//     } catch (error) {
//        console.log("error", error);
        
//     }

// });

// export const completeTodos = createAsyncThunk("todos/completeTodos", async (state) => {
//   console.log(state)
//   try {
//     const docRef = doc(db, "todos", state.id);
//     setDoc(docRef, state)
//     return state

//   } catch (error) {
//     console.log(error);
//   }
// });


export const eventSlice = createSlice({
    name: "todo",
    initialState: {
        events:[],
        filter: "All",
        loading: false,
        stateTriger: true,
        event:{
            title: '',
            description: '',
            date: '',
            time: '',
            location:"",
            creator:"",
            attendees:"",
            status:""
          }
    },
    reducers:{
        // getTodo: (state, action)=> {
        //     state.todo = state.todos.find( (item)=>  item.id == action.payload )
        // },
        addEvent: (state, action) => {
          console.log("add event Reducer",action.payload)
            const newEvent = { ...action.payload,  id: uuidv4() };
            state.events = [ newEvent, ...state.events ]
        },
        // deleteTodo: (state, action) => {
        //     state.todos = state.todos.filter( (item) => item.id !== action.payload )
        // },
        // updateTodos: (state, action) => {
        //   console.log("update reducer",action.payload)
        //   state.stateTriger = true
        //     state.todos = state.todos.map( (item)=> item.id === action.payload.id ? action.payload : item )
        // },
        setFilter: (state, action) =>{ 
            console.log("Filter", action.payload)
            state.filter = action.payload
        }
    },

    extraReducers: (builder) => {

          builder.addCase(fetchEvents.pending, (state) => {
            state.loading = true;
            state.stateTriger = true
          });

          builder.addCase(fetchEvents.fulfilled, (state, action) => {
          state.loading = false;
          state.stateTriger = false;
          state.events = action.payload;
          });

          builder.addCase(fetchEvents.rejected, (state) => {
            state.loading = false;
          });

        //   builder.addCase(deleteTodos.fulfilled, (state, action) => {
        //     const todos = state.todos;
        //     const item =  action.payload;
        //     state.todos = todos.filter((todo) => item.id !== todo.id)
        //   });    


        //   builder.addCase(completeTodos.fulfilled, (state, action) => {
        //     const todos = state.todos;
        //     state.todos = todos.map( (todo)=> todo.id === action.payload.id ? action.payload : todo )
        //   });    



          
    
      }

})

export const {addEvent, setFilter} = eventSlice.actions;

export default eventSlice.reducer;