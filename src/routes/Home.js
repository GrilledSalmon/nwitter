import Nweet from 'components/Nweet';
import { dbService } from 'fbase';
import { query, where, getDocs, onSnapshot, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const firestore = new dbService.getFirestore();
const collectionRef = dbService.collection(firestore, 'nweets');
const q = query(collectionRef, orderBy('createdAt'));

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  // const getNweets = async () => {
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const nweetObject = {
  //       id: doc.id,
  //       ...doc.data(),
  //     };
  //     setNweets((prev) => [...prev, nweetObject]);
  //   });
  // };

  useEffect(() => {
    // getNweets();
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        // 실시간으로 변화 반영을 가능하게 해줌
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const docRef = await dbService.addDoc(collectionRef, {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet('');
    console.log(docRef);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweetObj) => {
          return (
            <Nweet
              key={nweetObj.id}
              nweetObj={nweetObj}
              isOwner={userObj.uid === nweetObj.creatorId}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Home;
