//Thanks for geeksforgeeks, thatsjsdude
(function(){
   function MyArray(){
      this.arr = [];
   };
 
 //Remove duplicate from array, Use filter function of array to include where position == index of item 
   MyArray.prototype.removeDup = function(a){

      if(a.length === 0){
          return a;
      }else{
        this.arr = a.filter(function(item, pos){
           /*if(a.indexOf(item) == pos){
             console.log(pos, a.indexOf(item));

           }*/
           return a.indexOf(item) == pos;
        });
        return this.arr;
      }
   };

   //Mark the repeated Numbers
   MyArray.prototype.repeatedNumbers = function(a){
        this.arr = a;
        if(this.arr.length === 0){
           return this.arr;
        }
        for(var i = 0;i < this.arr.length; i++){
             if(this.arr[Math.abs(this.arr[i])] > 0){
                 this.arr[Math.abs(this.arr[i])] = -this.arr[Math.abs(this.arr[i])];
                 console.log(this.arr[i]);
             }else{
                 console.log("repeated numbers ", Math.abs(this.arr[i]));
             }
        }
   };

   MyArray.prototype.missingNumber = function(a){
       this.arr = a;
       if(this.arr.length === 0){
           return this.arr;
       }else{
          var n = this.arr.length +1,
              currSum = n*(n+1)/2,
              sum = 0;
          for(var i = 0;i < this.arr.length;i++) {
              sum += this.arr[i];
          }
          return currSum - sum;
       }

   };

   //Check pair exist for given sum in an array, Keep the object named differ and search for substract key if it exist
   MyArray.prototype.checkPairForSum = function(a, sum){
       var differ = {},
           substract = 0;
       this.arr = a;
 
       for(var i = 0;i < this.arr.length; i++){
            substract = sum - this.arr[i];
            if(differ[substract]){
                return true;
            }else{
               differ[this.arr[i]] = true;
            }
       }
   };

   //find out the difference between any two elements such that larger element appears after the smaller number in arr[].
   MyArray.prototype.findMaxDiff = function(a){
       var maxDiff = a[1] - a[0],
           minEl = arr[0];
       if(a.length == 0){
           return a;
       }
       for(var i = 0;i < a.length;i++){
           if(a[i] - minEl > maxDiff){
              maxDiff = arr[i] - minEl;
           }
           if(a[i] < minEl){
               minEl = a[i];
           }
       }
       return maxDiff;
   };
   
   //Reverse an array
   MyArray.prototype.reverse = function(a){
       if(a.length == 0){
           return a;
       }
       var temp, j = a.length - 1;
       for(var i = 0; i < a.length/2;i++,j--){
            temp = a[i];
            a[i] = a[j];
            a[j] = temp;
       }
       return a;
   };

   var arr = new MyArray();
   //console.log(arr);
   
   arr.removeDup([2,1,3,3,4]);
   console.log(arr);
   //arr.repeatedNumbers([1,2,3,3,4,4]);
   // console.log(arr.missingNumber([1,2,3,4,5]));
   //console.log(arr.checkPairForSum([1,2,3,4,5], 9));
   console.log(arr.findMaxDiff([1,5,3,2,4]));
   console.log(arr.reverse([1,5,3,2,4]));


}());
