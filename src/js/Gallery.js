/* eslint-disable class-methods-use-this */

export default class Gallery {
    constructor() {
      this.form = document.getElementById('form');
      this.imagesList = document.querySelector('.images-list');
      this.urlError = document.querySelector('.form-item__error');
      this.images = document.querySelector('.images');
  
      this.events();
    }
  
    events() {
      this.form.addEventListener('submit', this.formSubmit.bind(this));
      this.images.addEventListener('click', this.deleteImage.bind(this));
    }
  
    addImage(name, url) {
      const img = document.createElement('img');
      img.classList.add('images-item__img');
      img.alt = name;
      img.src = url;
  
      img.onload = () => {
        const li = document.createElement('li');
        li.classList.add('images-item');
  
        const del = document.createElement('span');
        del.classList.add('images-item__del');
        del.textContent = 'x';
  
        const nameSpan = document.createElement('span');
        nameSpan.classList.add('images-item__name');
        nameSpan.textContent = name;
  
        li.append(del);
        li.append(img);
        li.append(nameSpan);
        this.imagesList.append(li);
      };
  
      img.onerror = () => {
        this.urlError.classList.add('form-item__error_display');
      };
    }
  
    deleteImage(e) {
      const del = e.target.closest('.images-item__del');
      const img = e.target.closest('.images-item');
      if (!del) return;
      img.remove();
    }
  
    formSubmit(e) {
      e.preventDefault();
  
      this.urlError.classList.remove('form-item__error_display');
  
      const formData = new FormData(this.form);
      const name = formData.get('name');
      const url = formData.get('url');
      this.addImage(name, url);
      this.form.reset();
    }
  }
  