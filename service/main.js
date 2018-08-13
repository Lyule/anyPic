
const request = require('../request');

class mainService {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async getImagesUri() {
    const result = await request({
      url: 'https://photo.fengniao.com/ajaxPhoto.php?action=getPhotoLists&fid=101&sort=1&page=1',
      method: 'GET'
    });
    const { code, content } = JSON.parse(result)
    if(code == 1) {
      return content;
    }
  }
}

module.exports = mainService;
