let number = 0;

    
        document.getElementById('decrease').addEventListener('click', function() {
            number--;
            document.getElementById('number').textContent = number;
        });

        document.getElementById('increase').addEventListener('click', function() {
            number++;  // increase when + is clicked
            document.getElementById('number').textContent = number;
        });



        document.getElementById("bookNowBtn").addEventListener("click", function() {
        const count = document.getElementById("number").innerText;
        alert("Booking confirmed! Number of Single Rooms: " + count);
    });
    

   let number1 = 0;

    
        document.getElementById('decrease1').addEventListener('click', function() {
            number--;
            document.getElementById('number1').textContent = number1;
        });

        document.getElementById('increase1').addEventListener('click', function() {
            number1++;  // increase when + is clicked
            document.getElementById('number1').textContent = number1;
        });



        document.getElementById("bookNowBtn1").addEventListener("click", function() {
        const count = document.getElementById("number1").innerText;
        alert("Booking confirmed! Number of Double Rooms: " + count);
    });



    let number2 = 0;

    
        document.getElementById('decrease2').addEventListener('click', function() {
            number--;
            document.getElementById('number2').textContent = number2;
        });

        document.getElementById('increase2').addEventListener('click', function() {
            number2++;  // increase when + is clicked
            document.getElementById('number2').textContent = number2;
        });



        document.getElementById("bookNowBtn2").addEventListener("click", function() {
        const count = document.getElementById("number2").innerText;
        alert("Booking confirmed! Number of Triple Rooms: " + count);
    });
     


    let number3 = 0;

    
        document.getElementById('decrease3').addEventListener('click', function() {
            number--;
            document.getElementById('number3').textContent = number3;
        });

        document.getElementById('increase3').addEventListener('click', function() {
            number3++;  // increase when + is clicked
            document.getElementById('number3').textContent = number3;
        });



        document.getElementById("bookNowBtn3").addEventListener("click", function() {
        const count = document.getElementById("number3").innerText;
        alert("Booking confirmed! Number of Queen Rooms: " + count);
    });
     

    let number4 = 0;

    
        document.getElementById('decrease4').addEventListener('click', function() {
            number--;
            document.getElementById('number4').textContent = number4;
        });

        document.getElementById('increase4').addEventListener('click', function() {
            number4++;  // increase when + is clicked
            document.getElementById('number4').textContent = number4;
        });



        document.getElementById("bookNowBtn4").addEventListener("click", function() {
        const count = document.getElementById("number4").innerText;
        alert("Booking confirmed! Number of King Rooms: " + count);
    });

    let number5 = 0;

    
        document.getElementById('decrease5').addEventListener('click', function() {
            number--;
            document.getElementById('number5').textContent = number5;
        });

        document.getElementById('increase5').addEventListener('click', function() {
            number5++;  // increase when + is clicked
            document.getElementById('number5').textContent = number5;
        });



        document.getElementById("bookNowBtn5").addEventListener("click", function() {
        const count = document.getElementById("number5").innerText;
        alert("Booking confirmed! Number of Hollywod Rooms: " + count);
    });
     


     document.getElementById("submit").addEventListener("click", function() {
        //const count = document.getElementById("number5").innerText;
        alert("Successfully Submit!");
    });