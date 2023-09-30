import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          handleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button onClick={() => setShowAddFriend(!showAddFriend)}>
          {showAddFriend ? "Close" : "Add a friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          friend={selectedFriend}
          handleSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function FriendsList({ friends, handleSelectedFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          handleSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, handleSelectedFriend, selectedFriend }) {
  const isSelected =
    selectedFriend !== null
      ? selectedFriend.id === friend.id
        ? true
        : false
      : false;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance === 0 ? (
        <p>You and {friend.name} are even.</p>
      ) : friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      ) : (
        <p className="green">
          {friend.name} owes you ${friend.balance}
        </p>
      )}
      <Button onClick={() => handleSelectedFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    "data:image/jpeg;base64,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"
  );
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const newFriend = {
      name,
      image,
      balance: 0,
      id: crypto.randomUUID(),
    };
    handleAddFriend(newFriend);
    setName("");
    setImage(
      "data:image/jpeg;base64,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"
    );
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>&times; Friend Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      ></input>
      <label>&times; Image URL</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ friend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    handleSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
      <h2>Split bill with {friend.name}</h2>
      <label>Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
      <label>Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      ></input>
      <label>{friend.name} expense</label>
      <input value={paidByFriend} disabled type="text"></input>
      <label>Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button>Split Bill!</Button>
    </form>
  );
}
