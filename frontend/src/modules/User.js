const User = (function () {
  let id = "";
  let username = "";
  let date_registered = "";
  let profile_picture = "";
  let authorized = false;
  let can_create_pages = false;
  let can_edit_pages = false;
  let can_delete_pages = false;

  const getData = (options) => {
    let date = date_registered;
    if (options.dateString) {
      date = new Date(date_registered).toLocaleDateString(options.dateString);
    }
    return {
      id,
      username,
      profile_picture,
      date_registered: date,
      authorized,
      can_create_pages,
      can_edit_pages,
      can_delete_pages,
    };
  };

  const getName = () => {
    if (username !== "" && username) return username;
    else return id;
  };

  const getId = () => {
    return id;
  };

  const isAuthorized = () => {
    return authorized;
  };

  const getAvatar = () => {
    if (profile_picture !== "" && profile_picture) return profile_picture;
    else
      return "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
  };

  const canCreatePages = () => {
    return can_create_pages;
  };

  const canEditPages = () => {
    return can_edit_pages;
  };

  const canDeletePages = () => {
    return can_delete_pages;
  };

  const getDateRegistered = () => {
    return date_registered;
  };

  const setData = (userData) => {
    if (!userData) userData = {};
    id = userData.username ?? "";
    username = userData.display_name ?? "";
    date_registered = userData.date_registered ?? "";
    authorized = userData?.username ? true : false;
    profile_picture = userData.profile_picture ?? "";
    can_create_pages = userData.can_create_pages ?? false;
    can_edit_pages = userData.can_edit_pages ?? false;
    can_delete_pages = userData.can_delete_pages ?? false;
  };

  return {
    getData,
    getName,
    getId,
    isAuthorized,
    getAvatar,
    canCreatePages,
    canEditPages,
    canDeletePages,
    getDateRegistered,
    setData,
    id,
  };
})();

// username: username,
// password: password,
// email: email ?? "",
// display_name: username,
// date_registered: new Date(),
// can_create_pages: true,
// can_edit_pages: false,
// can_delete_pages: false,

export default User;
