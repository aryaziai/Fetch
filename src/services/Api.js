// const API_ROOT = `http://localhost:3000/api/v1/`;
// let token = localStorage.getItem("token")

// const headers = {
//   'Content-Type': 'application/json',
//   Accepts: 'application/json',
//   "Authorization": token
// };

// // const getPictures = () => {
// //   return fetch(`${API_ROOT}pictures/`, { headers: headers }).then(res =>
// //     res.json()
// //   );
// // };
// // const getComments = () => {
// //   return fetch(`${API_ROOT}comments/`, { headers: headers }).then(res =>
// //     res.json()
// //   );
// // };

// // const postPictureLike = (user_id, picture_id) => {
// //   return fetch(`${API_ROOT}picture_likes`, {
// //     method: `Post`,
// //     headers: headers,
// //     body: JSON.stringify({picture_like: {user_id: user_id, picture_id: picture_id}})
// //   }).then(res => res.json());
// // }
// // const deletePictureLike = (like_id) => {
// //   return fetch(`${API_ROOT}picture_likes/${like_id}`, {
// //     method: `Delete`,
// //     headers: headers
// //   }).then(res => res.json());
// // }
// // const postPictureDislike = (user_id, picture_id) => {
// //   return fetch(`${API_ROOT}picture_dislikes`, {
// //     method: `Post`,
// //     headers: headers,
// //     body: JSON.stringify({picture_dislike: {user_id: user_id, picture_id: picture_id}})
// //   }).then(res => res.json());
// // }
// // const deletePictureDislike = (like_id) => {
// //   return fetch(`${API_ROOT}picture_dislikes/${like_id}`, {
// //     method: `Delete`,
// //     headers: headers
// //   }).then(res => res.json());
// // }

// // const postLike = (user_id, comment_id) => {
// //   return fetch(`${API_ROOT}likes`, {
// //     method: `Post`,
// //     headers: headers,
// //     body: JSON.stringify({like: {user_id: user_id, comment_id: comment_id}})
// //   }).then(res => res.json());
// // }

// // const deleteLike = (like_id) => {
// //   console.log(like_id)
// //   return fetch(`${API_ROOT}likes/${like_id}`, {
// //     method: `Delete`,
// //     headers: headers
// //   }).then(res => res.json());
// // }


// // const postDislike = (user_id, comment_id) => {
// //   return fetch(`${API_ROOT}dislikes`, {
// //     method: `Post`,
// //     headers: headers,
// //     body: JSON.stringify({dislike: {user_id: user_id, comment_id: comment_id}})
// //   }).then(res => res.json());
// // }
// // const deleteDislike = (like_id) => {
// //   return fetch(`${API_ROOT}dislikes/${like_id}`, {
// //     method: `Delete`,
// //     headers: headers
// //   }).then(res => res.json());
// // }

// // const postPicture = ({img_url, user_id, roast_bio, toast_bio}) => {
// //   return fetch(`${API_ROOT}pictures`, {
// //     method: `Post`,
// //     headers: headers,
// //     redirect: "follow",
// //     body: JSON.stringify({picture: {img_url: img_url, user_id: user_id, roast_bio: roast_bio, toast_bio: toast_bio}})
// //   }).then(res => res.json())
  
// // }

// // const postComment = ({text, roast, picture_id, user_id}) => {
// //     return fetch(`${API_ROOT}comments`, {
// //       method: `Post`,
// //       headers: headers,
// //       body: JSON.stringify({picture_id: picture_id, user_id: user_id, text: text, roast: roast})
// //     }).then(res => res.json());
// //   };

// // const getComment = (id) => {
// //   return fetch(`${API_ROOT}comments/${id}`, {
// //     method: `Get`,
// //     headers: headers
// //   }).then(res => res.json())
// // }

// // const deleteComment = (id) => {
// //   return fetch(`${API_ROOT}comments/${id}`, {
// //     method: `Delete`,
// //     headers: headers
// //   }).then(res => res.json())
// // }

// // const getPicture = (id) => {
// //   return fetch(`${API_ROOT}pictures/${id}`, { headers: headers }).then(res =>
// //     res.json()
// //   );
// const signUp = (username, password, passwordConfirmation) => {
//   return fetch(`${API_ROOT}users`, {
//     method: `POST`,
//     headers: headers,
//     body: JSON.stringify({ user: {username: username, password: password, password_confirmation: passwordConfirmation} })
//   }).then(res => res.json());
// };

// const login = (username, password) => {
//   return fetch(`${API_ROOT}login`, {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify({ user: {username, password} })
//   }).then(res => res.json());
// };

// const getCurrentUser = () => {
//   return fetch(`${API_ROOT}current_user`, {
//     headers: headers
//   }).then(res => res.json());
// };

// const getUser = (id) => {
//   return fetch(`${API_ROOT}users/${id}`, {
//     headers: headers
//   }).then(res => res.json());
// }

// const deleteUser = (id) => {
//   return fetch(`${API_ROOT}users/${id}`, {
//     method: `Delete`,
//     headers: headers
//   }).then(res => res.json())
// }

// // export default {
// //   signUp,
// //   getUser,
// //   deleteUser,
// //   auth: {
// //     login,
// //     getCurrentUser
// //   },
// //   pictures: {
// //     getPictures,
// //     postPicture,
// //     getPicture,
// //     postPictureLike,
// //     deletePictureLike,
// //     postPictureDislike,
// //     deletePictureDislike
// //   },
// //   comments: {
// //     getComment,
// //     getComments,
// //     postComment,
// //     deleteComment,
// //     postLike,
// //     postDislike,
// //     deleteLike,
// //     deleteDislike
// //   }
// // };