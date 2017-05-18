

function calculator() {

	var total = '',
		value,
		operator, 
		memory = null, 
		equal =false;

	var butts = document.getElementsByTagName('button');

	for (var i = 0; i < butts.length; i++) {
		butts[i].addEventListener("mousedown", function (e) {
			keypunch(e);
			debug();
		});
	}


	function keypunch(e) {

		value = e.target.value;

		if (/\d/.test(value)||value==".") {
			if(value=='0' && total==''){
				//do nothing (if total is zero and key pressed is zero)
			} else {
				if (equal) {
					total = '';
					operator = null;
					equal = false;
					memory = null;
				}
				total += value;
				print(total);
			}
		} 
		
		if (value=='+'||value=='-'||value=='/'||value=='*') {

			//prevents duplicate press of operator key
			if(total){ 

				//if the PREVious operator was not equalled out
				if (!equal) { 

					//
					if (operator) { 
						operation(operator);
						operator = value;
						total = '';
						print(memory);
					} else {
						memory = Number(total);
						operator = value;
						total = '';
						print(memory);				
					}

				//if Equal key was the PREVious key pressed	
				} else { 
					equal = false;
					operator = value;
					total = '';
					print(memory);
				}
			}

		} 
		if (value=='=') {
			if (operator && total) {
				operation(operator);
				equal = true;
				print(memory);
			}
		}
		if (value=='+-') {
			if (!equal) {
				total = Number(total) * -1;
				print(total);
			} else {
				memory *= -1;
				print(memory);
			}
		}
		if (value=='sqrt') {
			total = Math.sqrt(Number(total));
			print(total);
		}
		if (value=='c') {
			total = '';
			print(0);
		}
		if (value=='cl') {
			total = '';
			memory = null;
			operator = null;
			print(0);
		}
	}

// Helper Functions //

	function operation(operator) {
		switch(operator){
			case "+":
				return memory += Number(total);
			case "-":
				return memory -= Number(total);
			case "/":
				return memory /= Number(total);
			case "*":
				return memory *= Number(total);
		}
	}

	function print(something) {
		something = something.toString();
		//Rounds to max digits of 8 (I think)
		if(something.length>8){
			if(Number(something.charAt(8))>4){
				var end = Number(something.slice(7,8)) + 1;
				if(end===10){

				}
				console.log(end);
				console.log(something.slice(0, 7));
				something = something.slice(0, 7).concat(end.toString());
			}
			else{
				something = something.slice(0, 8);
			}
		}

		var display = document.getElementById('display');
		display.textContent = something;
	}

	function debug() {
		console.log("[ total = "+total+"; \n"+
					  "operator is "+operator+"; \n"+
					  "memory = "+memory+"; \n"+
					  "equal is "+equal+"]")
	}

}


window.onload = calculator;

