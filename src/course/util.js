export function getBase64Image(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  const dataURL = canvas.toDataURL('image/png');

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}

export function currentPage() {
  if (document.querySelector('#iframe1')) {
    return 'LOGIN';
  } else if (document.querySelector('input[value="已充分瞭解"], input[value="確定"]')) {
    return 'SKIP';
  } else if (document.querySelector('frameset')) {
    return 'MAIN';
  }
  return '';
}

export function skip() {
  const $$nextPageBtn = document.querySelector('input[value="已充分瞭解"], input[value="確定"]');
  $$nextPageBtn.click();
}

export default {
  getBase64Image,
  currentPage,
  skip,
};
