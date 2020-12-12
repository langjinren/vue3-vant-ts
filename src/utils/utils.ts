export default {
  getUrlKey:(name: any) => {
    // return decodeURIComponent(
    //   (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
    //     .exec(location.href) || ["", ""])[1]
    //     .replace(/\+/g, '%20')
    // ) || null

    var LocString = String(window.document.location.href);
    var rs = new RegExp('(^|)' + name + '=([^&]*)(&|$)', 'gi').exec(LocString),
      tmp;
    if ((tmp = rs)) {
      return tmp[2];
    }
    return '';
  }
}
