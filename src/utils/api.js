export const getComments = async () => {
  return [
    {
      id: "1",
      body: "I was very glad to have you after such a long time. Can you plan a meetup? Maybe this weekend?",
      username: "Maria",
      userId: "1",
      profile: require('../images/user1.png'),
      parentId: null,
    },
    {
      id: "2",
      body: "Home sweet home! I’m glad you are back. It’s been two year and miss the football matches we have together. A lot has been changed since you left. Let’s meet at the ground tomorrow evening?",
      username: "Alex Benjamin",
      userId: "2",
      profile: require('../images/user2.png'),
      parentId: null,
    },
    {
      id: "3",
      body: "I was very glad to have you after such a long time. Can you plan a meetup? Maybe this weekend?",
      username: "Tania",
      userId: "3",
      profile: require('../images/user3.png'),
      parentId: null,
    },
  ];
};

export const createComment = async (text, parentId = null) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: "1",
      profile: require('../images/user4.png'),
      username: "John Doe",
    };
  };
