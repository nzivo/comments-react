export const getReplies = async () => {
  return [
    {
      id: "1",
      icon: "image-amyrobson.png",
      body: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredicle. You've nailed the design and the responsiveness at various breakpoints works really well",
      username: "amyrobson",
      userId: "1",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "2",
      icon: "image-maxblagun.png",
      body: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can Learn React? Thanks!",
      username: "maxblagun",
      userId: "2",
      parentId: null,
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "3",
      icon: "image-ramsesmiron.png",
      body: "if you're still new. I'd recommend focusing on the fundamentals of HTMl, CSS and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      username: "ramsesmiron",
      userId: "2",
      parentId: "1",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
    {
      id: "4",
      icon: "user-icon.png",
      body: "@ramsesmiron I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant",
      username: "julisomo",
      userId: "2",
      parentId: "2",
      createdAt: "2021-08-16T23:00:33.010+02:00",
    },
  ];
};

export const createReply = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "juliusomo",
    icon: "user-icon.png",
    createdAt: new Date().toISOString(),
  };
};

export const updateReply = async (text) => {
  return { text };
};

export const deleteReply = async () => {
  return {};
};
