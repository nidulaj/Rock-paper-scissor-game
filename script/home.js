
      function getName(){
         let name = document.querySelector('.name-input').value;
        localStorage.setItem('userName' , name);
        console.log(name);
      }

      function printName(){
        let name = localStorage.getItem('userName');
        document.querySelector('topic').innerHTML = `Welcome ${name}`;
      }