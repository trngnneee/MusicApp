module.exports.playlistCreatePost = async (req, res) => {
  if (!req.account.playlist) {
    req.account.playlist = [];
  }
  else {
    for (const item of req.account.playlist) {
      if (item.name == req.body.name) {
        res.json({
          code: "error",
          message: "Tên Playlist đã tồn tại!"
        });
        return;
      }
    }
  }

  const avatar = "https://res.cloudinary.com/dnqinxiwo/image/upload/v1758553854/playlistAvatar_ndvp3q.png";

  const newPlaylist = {
    name: req.body.name,
    avatar: avatar,
    idList: []
  };

  req.account.playlist.push(newPlaylist);

  await req.account.save();

  res.json({
    code: "success",
    message: "Tạo playlist thành công!"
  })
}

module.exports.playlistGet = (req, res) => {
  const playlist = req.account.playlist;

  res.json({
    code: "success",
    message: "Lấy dữ liệu thành công",
    playlist: playlist
  })
}

module.exports.playlistAddPatch = async (req, res) => {
  for (const item of req.account.playlist) {
    if (item.name == req.body.playlistName) {
      if (item.idList.length > 0 && item.idList.includes(req.body.id)) {
        res.json({
          code: "error",
          message: "Bài hát đã tồn tại trong Playlist!"
        });
        return;
      }
      else {
        item.idList.push(req.body.id);
        req.account.markModified("playlist");
        await req.account.save();
        res.json({
          code: "success",
          message: "Thêm vào Playlist thành công!"
        });
        return;
      }
    }
  }
}