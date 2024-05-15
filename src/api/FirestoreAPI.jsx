import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");
let majorsRef = collection(firestore, "majors");
const cusswords = [ "ahole", "anus", "ash0le", "ash0les", "asholes", "ass", "Ass Monkey", "Assface", "assh0le", "assh0lez", "asshole", "assholes", "assholz", "asswipe", "azzhole", "bassterds", "bastard", "bastards", "bastardz", "basterds", "basterdz", "Biatch", "bitch", "bitches", "Blow Job", "boffing", "butthole", "buttwipe", "c0ck", "c0cks", "c0k", "Carpet Muncher", "cawk", "cawks", "Clit", "cnts", "cntz", "cock", "cockhead", "cock-head", "cocks", "CockSucker", "cock-sucker", "crap", "cum", "cunt", "cunts", "cuntz", "dick", "dild0", "dild0s", "dildo", "dildos", "dilld0", "dilld0s", "dominatricks", "dominatrics", "dominatrix", "dyke", "enema", "f u c k", "f u c k e r", "fag", "fag1t", "faget", "fagg1t", "faggit", "faggot", "fagg0t", "fagit", "fags", "fagz", "faig", "faigs", "fart", "flipping the bird", "fuck", "fucker", "fuckin", "fucking", "fucks", "Fudge Packer", "fuk", "Fukah", "Fuken", "fuker", "Fukin", "Fukk", "Fukkah", "Fukken", "Fukker", "Fukkin", "g00k", "God-damned", "h00r", "h0ar", "h0re", "hells", "hoar", "hoor", "hoore", "jackoff", "jap", "japs", "jerk-off", "jisim", "jiss", "jizm", "jizz", "knob", "knobs", "knobz", "kunt", "kunts", "kuntz", "Lezzian", "Lipshits", "Lipshitz", "masochist", "masokist", "massterbait", "masstrbait", "masstrbate", "masterbaiter", "masterbate", "masterbates", "Motha Fucker", "Motha Fuker", "Motha Fukkah", "Motha Fukker", "Mother Fucker", "Mother Fukah", "Mother Fuker", "Mother Fukkah", "Mother Fukker", "mother-fucker", "Mutha Fucker", "Mutha Fukah", "Mutha Fuker", "Mutha Fukkah", "Mutha Fukker", "n1gr", "nastt", "nigger;", "nigur;", "niiger;", "niigr;", "orafis", "orgasim;", "orgasm", "orgasum", "oriface", "orifice", "orifiss", "packi", "packie", "packy", "paki", "pakie", "paky", "pecker", "peeenus", "peeenusss", "peenus", "peinus", "pen1s", "penas", "penis", "penis-breath", "penus", "penuus", "Phuc", "Phuck", "Phuk", "Phuker", "Phukker", "polac", "polack", "polak", "Poonani", "pr1c", "pr1ck", "pr1k", "pusse", "pussee", "pussy", "puuke", "puuker", "qweir", "recktum", "rectum", "retard", "sadist", "scank", "schlong", "screwing", "semen", "sex", "sexy", "Sh!t", "sh1t", "sh1ter", "sh1ts", "sh1tter", "sh1tz", "shit", "shits", "shitter", "Shitty", "Shity", "shitz", "Shyt", "Shyte", "Shytty", "Shyty", "skanck", "skank", "skankee", "skankey", "skanks", "Skanky", "slag", "slut", "sluts", "Slutty", "slutz", "son-of-a-bitch", "tit", "turd", "va1jina", "vag1na", "vagiina", "vagina", "vaj1na", "vajina", "vullva", "vulva", "w0p", "wh00r", "wh0re", "whore", "xrated", "xxx", "b!+ch", "bitch", "blowjob", "clit", "arschloch", "fuck", "shit", "ass", "asshole", "b!tch", "b17ch", "b1tch", "bastard", "bi+ch", "boiolas", "buceta", "c0ck", "cawk", "chink", "cipa", "clits", "cock", "cum", "cunt", "dildo", "dirsa", "ejakulate", "fatass", "fcuk", "fuk", "fux0r", "hoer", "hore", "jism", "kawk", "l3itch", "l3i+ch", "masturbate", "masterbat*", "masterbat3", "motherfucker", "s.o.b.", "mofo", "nazi", "nigga", "nigger", "nutsack", "phuck", "pimpis", "pusse", "pussy", "scrotum", "sh!t", "shemale", "shi+", "sh!+", "slut", "smut", "teets", "tits", "boobs", "b00bs", "teez", "testical", "testicle", "titt", "w00se", "jackoff", "wank", "whoar", "whore", "*damn", "*dyke", "*fuck*", "*shit*", "@$$", "amcik", "andskota", "arse*", "assrammer", "ayir", "bi7ch", "bitch*", "bollock*", "breasts", "butt-pirate", "cabron", "cazzo", "chraa", "chuj", "Cock*", "cunt*", "d4mn", "daygo", "dego", "dick*", "dike*", "dupa", "dziwka", "ejackulate", "Ekrem*", "Ekto", "enculer", "faen", "fag*", "fanculo", "fanny", "feces", "feg", "Felcher", "ficken", "fitt*", "Flikker", "foreskin", "Fotze", "Fu(*", "fuk*", "futkretzn", "gook", "guiena", "h0r", "h4x0r", "hell", "helvete", "hoer*", "honkey", "Huevon", "hui", "injun", "jizz", "kanker*", "kike", "klootzak", "kraut", "knulle", "kuk", "kuksuger", "Kurac", "kurwa", "kusi*", "kyrpa*", "lesbo", "mamhoon", "masturbat*", "merd*", "mibun", "monkleigh", "mouliewop", "muie", "mulkku", "muschi", "nazis", "nepesaurio", "nigger*", "orospu", "paska*", "perse", "picka", "pierdol*", "pillu*", "pimmel", "piss*", "pizda", "poontsee", "poop", "porn", "p0rn", "pr0n", "preteen", "pula", "pule", "puta", "puto", "qahbeh", "queef*", "rautenberg", "schaffer", "scheiss*", "schlampe", "schmuck", "screw", "sh!t*", "sharmuta", "sharmute", "shipal", "shiz", "skribz", "skurwysyn", "sphencter", "spic", "spierdalaj", "splooge", "suka", "b00b*", "testicle*", "titt*", "twat", "vittu", "wank*", "wetback*", "wichser", "wop*", "yed", "zabourah" ]
const containsCusswords = (text) => {
  const lowerCaseText = text.toLowerCase();
  return cusswords.some((cussword) => lowerCaseText.includes(cussword));
};

export const postStatus = (object, cusswords) => {
  if (containsCusswords(object.status, cusswords)) {
    toast.error("Your post contains inappropriate words. Please choose different wording.");
    throw new Error("Your post contains inappropriate words. Please choose different wording.");
  }
  
  addDoc(postsRef, object)
    .then(() => {
      toast.success("Post has been added successfully");
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getStatus = (setAllStatus) => {
  const today = new Date();
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);
  const queryByTagAndDate = query(
    postsRef,
    orderBy("timeStamp", "desc")
  );

  onSnapshot(queryByTagAndDate, (response) => {
    console.log(response.docs); // Log the documents returned by the query
    const filteredPosts = response.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((post) => {
        const pubDate = new Date(post.timeStamp);
        return pubDate < threeDaysLater;
      })      .sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate)); // Sort by pubDate
      setAllStatus(filteredPosts)
  
   
  });
};


export const getAllUsers = (setAllUsers) => {
  const allusers = query(userRef);
  onSnapshot(allusers, (snapshot) => {
    setAllUsers(
      snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
    );
  });
};

export const getAllEventsUsers = (setAllEventUsers) => {
  const allEventUsers = query(userRef, where("tag", "!=", null));
  onSnapshot(allEventUsers, (snapshot) => {
    setAllEventUsers(
      snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
    );
  });
};

export const getTodaysEvents = (setTodaysEvents) => {
  const today = new Date();

  const queryByTagAndDate = query(
    postsRef,
    where("tag", "!=", null),
    orderBy("tag"),
    orderBy("pubDate", "asc")
  );

  onSnapshot(queryByTagAndDate, (response) => {
    console.log(response.docs); // Log the documents returned by the query
    const filteredPosts = response.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((post) => {
        console.log(post)
        const pubDate = new Date(post.timeStamp);
        return pubDate < today;
      })      .sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate)); // Sort by pubDate
      setTodaysEvents(filteredPosts)
  
   
  });
};

export const getMajors = (setMajors) => {
  const uniqueMajors = new Set(); // Initialize a Set to store unique majors
  
  const queryMajors = query(majorsRef);
  onSnapshot(queryMajors, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.major) { // Assuming the major field exists in your document
        uniqueMajors.add(data.major); // Add each major to the Set
      }
    });
    
    // Convert Set back to an array and set it to the state
    setMajors(Array.from(uniqueMajors));
  });
};

export const getPostsByMajor = (setPostByMajor, major) =>{
  const queryPosts = query(majorsRef, where("major", "==", major));

  onSnapshot(queryPosts, (response) => {
    setPostByMajor(
      response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
    );
  });

}
export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));

  onSnapshot(singlePostQuery, (response) => {
    const statuses = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    setAllStatus(statuses);
  

  });
};


export const getSingleUserbyId = (setCurrentUser, userID) => {
  const singleUserQuery = query(userRef, where("userID", "==", userID));

  onSnapshot(singleUserQuery, (response) => {
    const userData = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))[0];


    setCurrentUser(userData);
  });
};


export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    const userData = response.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))[0];
    setCurrentUser(userData);
    console.log(userData); // Print the user data
    console.log("ran")
  });
};


export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.error(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  return onSnapshot(userRef, (response) => {
    const userData = response.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      .filter((item) => item.email === localStorage.getItem("userEmail"))[0];

    setCurrentUser(userData);
  });
};


export const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID);
  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      console.error(err);
    });
};

export const likePost = (userId, postId, liked) => {
  try {
    let docToLike = doc(likeRef, `${userId}_${postId}`);
    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (err) {
    console.error(err);
  }
};

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));

    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes ? likes.length : 0;

      const isLiked = likes.some((like) => like.userId === userId);

      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.error(err);
  }
};

export const postComment = async (postId, comment, timeStamp, userID) => {
  try {
    const id = `${timeStamp}-${userID}`;

    await addDoc(commentsRef, {
      postId,
      comment,
      timeStamp,
      userID,
    });
  } catch (err) {
    console.error("Error posting comment:", err);
  }
};

export const getComments = (postId, setComments) => {
  try {
    let singlePostQuery = query(commentsRef, where("postId", "==", postId));

    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(comments);
    });
  } catch (err) {
    console.error(err);
  }
};

export const updatePost = (id, status, postImage) => {
  let docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status, postImage });
    toast.success("Post has been updated!");
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been Deleted!");
  } catch (err) {
    console.error(err);
  }
};
export const deletePostwithPostID = async (postID) => {
  try {
    console.log(postID);
    // Query the collection to find the document with matching postID
    const q = query(postsRef, where("postID", "==", postID));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      deletePost(posts[0].id)
      // Collect references of documents with matching postID

    });

    // Remember to unsubscribe when no longer needed
    return unsubscribe;
  } catch (error) {
    console.error("Error deleting post:", error);
    toast.error("Error deleting post. Please try again later.");
  }
};



 

    



export const addConnection = (userId, targetId) => {
  try {
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);

    setDoc(connectionToAdd, { userId, targetId });

    toast.success("Connection Added!");
  } catch (err) {
    console.error(err);
  }
};

export const deleteConnection = async (userId, targetId) => {
  try {
    const connectionDoc = doc(connectionRef, `${userId}_${targetId}`);
    await deleteDoc(connectionDoc);
    toast.success("Connection Deleted!");
  } catch (err) {
    console.error(err);
  }
};

export const deleteComment = async (id) => {
  try {
    const connectionDoc = doc(commentsRef, `${id}`);
    await deleteDoc(connectionDoc);
    toast.success("Comment Deleted!");
  } catch (err) {
    console.error("Error deleting comment:", err);
    toast.error("An error occurred while deleting the comment.");
  }
};

export const GetEventPost = (setPosts) => {
  const today = new Date();

  const queryByTagAndDate = query(
    postsRef,
    where("tag", "!=", null),
    orderBy("tag"),
    orderBy("pubDate", "asc")
  );

  onSnapshot(queryByTagAndDate, (response) => {
    console.log(response.docs); // Log the documents returned by the query
    const filteredPosts = response.docs
      .map((doc) => ({ ...doc.data(), id: doc.id }))
      .filter((post) => {
        const pubDate = new Date(post.timeStamp);
        return pubDate > today;
      })      .sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate)); // Sort by pubDate

  
    setPosts(filteredPosts);
  });
  

};



export const getConnections = async (userId, targetId, setIsConnected) => {
  // Check if both userId and targetId are defined
  // if (userId === undefined || targetId === undefined) {
  //   return false;
  // }

  try {
    

    // Check if the Firestore collection exists
    if (!connectionRef) {
      setIsConnected(false);
      return;
    }

    let connectionsQuery = query(
      connectionRef,
      where("userId", "==", userId),
      where("targetId", "==", targetId)
    );

    onSnapshot(connectionsQuery, (response) => {
      let connections = response.docs.map((doc) => doc.data());

      const isConnected = connections.length > 0; // Connection exists if there are any documents returned

      setIsConnected(isConnected);
    });
  } catch (err) {
    console.error(err);
    setIsConnected(false); // Handle error by setting isConnected to false
  }
};



export const getConnectionCount = (userId, setConnectionCount) => {
  try {
    if (!userId) {
      console.error("userId is undefined.");
      return;
    }

    let connectionsQuery = query(connectionRef, where("targetId", "==", userId));

    onSnapshot(connectionsQuery, (response) => {
      let connectionsCount = response.docs.length;
      setConnectionCount(connectionsCount);
    });
  } catch (err) {
    console.error(err);
  }
};


export const getConnectionsofuser = (userId, setFilteredConnections) => {
  try {
    let connectionsQuery = query(connectionRef, where("targetId", "==", userId));

    onSnapshot(connectionsQuery, (response) => {
      let connectionsCount = response.docs;
      setFilteredConnections(connectionsCount);
    });
  } catch (err) {
    console.error(err);
  }
};

export const getRequestCount = (userId, setRequestCount) => {
  try {
    let requestsQuery = query(connectionRef, where("userId", "==", userId));

    onSnapshot(requestsQuery, (response) => {
      let requestCount = response.docs.length;
      setRequestCount(requestCount);
    });
  } catch (err) {
    console.error(err);
  }
};

export const getPostCount = (userId, setPostCount) => {
  try {
    let postsQuery = query(postsRef, where("userID", "==", userId));

    onSnapshot(postsQuery, (response) => {
      let postCount = response.docs.length;
      setPostCount(postCount);
    });
  } catch (err) {
    console.error(err);
  }
};

export const getMessagesByUserId = (userId, setMessages) => {
  const queryByUserID = query(messagesRef, where("receiverID", "==", userId));
  onSnapshot(queryByUserID, (response) => {
    setMessages(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
};

export const sendMessage = async (senderId, receiverId, messageText) => {
  try {
    await addDoc(messagesRef, {
      senderID: senderId,
      receiverID: receiverId,
      text: messageText,
      timestamp: firestore.FieldValue.serverTimestamp()
    });
    console.log('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
