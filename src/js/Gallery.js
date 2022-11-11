export default class Gallery {
  constructor() {
    this.fileContainer = document.querySelector('.file-container');
    this.fileInput = this.fileContainer.querySelector('.file-container__overlapped');
    this.errors = document.querySelector('.errors-list');
    this.images = document.querySelector('.images');
    this.imagesList = this.images.querySelector('.images-list');
  }

  init() {
    this.events();
  }

  events() {
    this.fileContainer.addEventListener('click', () => this.fileInput.dispatchEvent(new MouseEvent('click')));
    this.fileContainer.addEventListener('dragover', (e) => e.preventDefault());
    this.fileContainer.addEventListener('drop', (e) => {
      e.preventDefault();
      this.addImages(e.dataTransfer.files);
    });
    this.fileInput.addEventListener('change', () => {
      this.addImages(this.fileInput.files);
      this.fileInput.value = '';
    });
    this.images.addEventListener('click', this.deleteImage.bind(this));
  }

  addImages(fileList) {
    this.errors.innerHTML = '';

    [...fileList].forEach((item) => {
      if (!item.type.startsWith('image/') || item.type.includes('vnd')) {
        this.showError(item.name);
        return;
      }

      const img = document.createElement('img');
      img.classList.add('images-item__img');
      img.alt = item.name;
      img.src = URL.createObjectURL(item);

      const li = document.createElement('li');
      li.classList.add('images-item');

      const del = document.createElement('span');
      del.classList.add('images-item__del');
      del.textContent = 'x';

      const nameSpan = document.createElement('span');
      nameSpan.classList.add('images-item__name');
      nameSpan.textContent = item.name;

      li.append(del);
      li.append(img);
      li.append(nameSpan);
      this.imagesList.append(li);
    });
  }

  deleteImage(e) {
    this.errors.innerHTML = '';
    const del = e.target.closest('.images-item__del');
    const img = e.target.closest('.images-item');
    if (!del) return;
    img.remove();
  }

  showError(fileName) {
    const li = document.createElement('li');
    li.innerHTML = `"${fileName}": this format of file do not suitable`;
    this.errors.append(li);
  }
}
