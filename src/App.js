import Replies from "./replies/Replies";

const App = () => {
  return (
    <div>
      <h1 className="align-center">Hello Roamtech</h1>
      <Replies
        repliesUrl="http://localhost:3004/comments"
        currentUserId="1"
      />
    </div>
  );
};

export default App;
