import { dbService, firebaseInstance } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';

const firestore = dbService.getFirestore();

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet???');
    if (ok) {
      const nweetDocRef = doc(firestore, `nweets/${nweetObj.id}`);
      await deleteDoc(nweetDocRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    const nweetDocRef = doc(firestore, `nweets/${nweetObj.id}`);
    event.preventDefault();
    await updateDoc(nweetDocRef, {text:newNweet});
    toggleEditing();
  }
  const onChange = (event) => {
    const {target: {value}} = event
    setNewNweet(value);
  }

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet!"
              value={newNweet}
              onChange={onChange}
              required
            />
            <input type='submit' value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <div>
              <button onClick={onDeleteClick}> Delete Nweet </button>
              <button onClick={toggleEditing}> Edit Nweet </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
