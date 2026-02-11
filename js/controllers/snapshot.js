/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('snapshotController', ['$scope', function ($scope) {


        $scope.currentIncome = 50000;
        
        $scope.currentAge = 45;
        $scope.retirementAge = 65;
        $scope.planningAge = 90;
        
        $scope.inflation = 2.5;
        
        $scope.cppAmount = 12780;
        $scope.cppStartAge = 65;
        $scope.oasAmount = 6764;
        $scope.oasStartAge = 65;
        
        $scope.rrspAmount = 0;
        $scope.rrspAnnCont = 0;
        $scope.rrspRate = 4.5;
        $scope.rrspFuture = 0;
        $scope.nonregAmount = 0;
        $scope.nonregAnnCont = 0;
        $scope.nonregRate = 4.5;
        $scope.nonregFuture = 0;
        $scope.tfsaAmount = 0;
        $scope.tfsaAnnCont = 0;
        $scope.tfsaRate = 4.5;
        $scope.tfsaFuture = 0;
        
        $scope.avgROR = 0;
     
        
        
        /*  This is for the chart color control and default data */
        $scope.labels = ["Add Investments to see your mix"];
        $scope.data = [1];
        $scope.series = ['Series A']
        $scope.colours = [
            {// blue

                strokeColor: 'rgba(21,15,32,1)',
                pointHighlightStroke: 'rgba(41,35,52,1)',
            },
             {// green

                strokeColor: 'rgba(38,85,140,1)',
                pointHighlightStroke: 'rgba(58,105,160,1)',
            },
             {// darkgrey

                strokeColor: 'rgba(85,4,2,1)',
                pointHighlightStroke: 'rgba(105,24,22,1)',
            },

        ]

        /* beginning of functions and calculations */

        $scope.futureValue = function (pv, rate, freq, periods) {
            return (pv * Math.pow(1 + (rate / 100 / freq), periods));
        };
        
        $scope.futureValueAnnuity = function (payment, rate, periods) {
            return  payment * ((Math.pow(1 + rate, periods) - 1 )/ rate);
        };
        
        $scope.monthlyPayment = function (pv, freq, rate, periods)
        {
            rate = rate / 100 / freq;
            var x = Math.pow(1 + rate, periods);
            var monthlyAmount = (pv * x * rate) / (x - 1);
            
            if (monthlyAmount > 0 ) {
                return monthlyAmount;
            }
            else {
                return 0;
            }
            
        };
        
        
        /* These are the calculations for the current holdings only */
        
        $scope.futureValueRrsp = function () {
            currentRrsp = $scope.rrspAmount;
            rrspRate = $scope.rrspRate;
            yearsUntilRetire = $scope.retirementAge - $scope.currentAge;
            futureRrsp = (currentRrsp * Math.pow(1 + (rrspRate / 100), yearsUntilRetire));
            return futureRrsp;
        };
        $scope.futureValueNonReg = function () {
            currentNonReg = $scope.nonregAmount;
            nonregRate = $scope.nonregRate;
            yearsUntilRetire = $scope.retirementAge - $scope.currentAge;
            futureNonReg = (currentNonReg * Math.pow(1 + (nonregRate / 100), yearsUntilRetire));
            return futureNonReg;
        };
        $scope.futureValueTfsa = function () {
            currentTfsa = $scope.tfsaAmount;
            tfsaRate = $scope.tfsaRate;
            yearsUntilRetire = $scope.retirementAge - $scope.currentAge;
            futureTfsa = (currentTfsa * Math.pow(1 + (tfsaRate / 100), yearsUntilRetire));
            return futureTfsa;
        };
        $scope.totalCurrentInvestments = function () {
            currentRrsp = $scope.rrspAmount;
            rrspRate = $scope.rrspRate;
            yearsUntilRetire = $scope.retirementAge - $scope.currentAge;
            futureRrsp = (currentRrsp * Math.pow(1 + (rrspRate / 100), yearsUntilRetire));
            currentNonReg = $scope.nonregAmount;
            nonregRate = $scope.nonregRate;
            yearsUntilRetire = $scope.retirementAge - $scope.currentAge;
            futureNonReg = (currentNonReg * Math.pow(1 + (nonregRate / 100), yearsUntilRetire));
            currentTfsa = $scope.tfsaAmount;
            tfsaRate = $scope.tfsaRate;
            yearsUntilRetire = $scope.retirementAge - $scope.currentAge;
            futureTfsa = (currentTfsa * Math.pow(1 + (tfsaRate / 100), yearsUntilRetire));
            return futureRrsp + futureNonReg + futureTfsa;
        };
        
      
        
        
        /* These controller the annual contributions calculations */
        $scope.futureValueRrspAnnCont = function () {
            RrspAnnCont = $scope.rrspAnnCont;
            rrspRate = $scope.rrspRate;
            yearsUntilRetire = $scope.retirementAge - $scope.currentAge;
            futureRrspAnnCont = RrspAnnCont * ((Math.pow(1 + (rrspRate / 100), yearsUntilRetire) - 1) / (rrspRate / 100));
            return futureRrspAnnCont;
        
        };
        
          $scope.futureValueNonRegAnnCont = function () {
            NonRegAnnCont = $scope.nonregAnnCont;
            nonregRate = $scope.nonregRate;
            yearsUntilRetire = $scope.retirementAge - $scope.currentAge;
            futureNonRegAnnCont = NonRegAnnCont * ((Math.pow(1 + (nonregRate / 100), yearsUntilRetire) - 1) / (nonregRate / 100));
            return futureNonRegAnnCont;
        
        };
        
         $scope.futureValueTfsaAnnCont = function () {
            TfsaAnnCont = $scope.tfsaAnnCont;
            tfsaRate = $scope.tfsaRate;
            yearsUntilRetire = $scope.retirementAge - $scope.currentAge;
            futureTfsaAnnCont = TfsaAnnCont * ((Math.pow(1 + (tfsaRate / 100), yearsUntilRetire) - 1) / (tfsaRate / 100));
            return futureTfsaAnnCont;
        
        };
        
        /* this controls the updating of the chart when you enter an investment */   
        
        $scope.updateChart = function () {

            var total = ($scope.futureValueRrsp() + $scope.futureValueRrspAnnCont() + $scope.futureValueNonReg() + $scope.futureValueNonRegAnnCont() + $scope.futureValueTfsa() + $scope.futureValueTfsaAnnCont());
            if (total > 0) {
                fvRrsp = $scope.futureValueRrsp() + $scope.futureValueRrspAnnCont();
                fvNonReg = $scope.futureValueNonReg() + $scope.futureValueNonRegAnnCont();
                fvTfsa = $scope.futureValueTfsa() + $scope.futureValueTfsaAnnCont();
                percentRrsp = (fvRrsp / (fvRrsp + fvNonReg + fvTfsa) * 100);
                percentNonReg = (fvNonReg / (fvRrsp + fvNonReg + fvTfsa) * 100);
                percentTfsa = (fvTfsa / (fvRrsp + fvNonReg + fvTfsa) * 100);
                labels = [];
                labels[0] = "RRSP" + " (" + Math.floor(percentRrsp) + "%)";
                labels[1] = "NonReg" + " (" + Math.floor(percentNonReg) + "%)";
                labels[2] = "TFSA" + " (" + Math.floor(percentTfsa) + "%)";
                data = [];
                data[0] = Math.floor(fvRrsp);
                data[1] = Math.floor(fvNonReg);
                data[2] = Math.floor(fvTfsa);
                fvTotal = fvRrsp + fvNonReg + fvTfsa;
                avgROR = ((fvRrsp / fvTotal) * $scope.rrspRate) + ((fvNonReg / fvTotal) * $scope.nonregRate) + ((fvTfsa / fvTotal) * $scope.tfsaRate);
                return $scope.data = data, $scope.labels = labels, $scope.avgROR = avgROR;
            }

            else {
                var labels = [];
                labels[0] = "Add Investments to see your mix";
                var data = [];
                data[0] = 1;
                return $scope.data = data, $scope.labels = labels;
            }

        };
        
        
        
        
        
        
        
        /* if ever there is a need to embed it a a function instead of on the viewer 
         $scope.calcRetirementAge = function() {
         if ($scope.retirementAge <= $scope.currentAge) {
         return $scope.retirementAge = $scope.currentAge + 1;
         }
         else {
         return $scope.retirementAge;
         }
         };
         
         
         $scope.calcPlanningAge = function() {
         if ($scope.planningAge <= $scope.retirementAge) {
         
         return $scope.planningAge = $scope.retirementAge + 1;
         }
         else {
         
         return $scope.planningAge;
         }
         };
         
         */
            

        /* Use for converting to currency for non angular items, may not be needed */
        $scope.toCurrency = function (num) {
            num = Math.round(num * 100) / 100;
            var currstring = num.toString();
            if (currstring.match(/\./)) {
                var curr = currstring.split('.');
            } else {
                var curr = [currstring, "00"];
            }
            curr[1] += "00";
            curr[2] = "";
            var returnval = "";
            var length = curr[0].length;
            // add 0 to decimal if necessary
            for (var i = 0; i < 2; i++)
                curr[2] += curr[1].substr(i, 1);
            // insert commas for readability
            for (i = length; (i - 3) > 0; i = i - 3) {
                returnval = "," + curr[0].substr(i - 3, 3) + returnval;
            }
            returnval = curr[0].substr(0, i) + returnval + "." + curr[2];
            return(returnval);
        }
        
        
        /* Observation Engine - will be using "obs" for short*/
        
        /* Compare current holdings vs contribution totals at the start of retirement */
        
        $scope.obsCurrVsContMsg = "";
        
        $scope.obsCurrVsCont = function () {
            curr = ($scope.futureValueRrsp() + $scope.futureValueNonReg() + $scope.futureValueTfsa());
            cont = ($scope.futureValueRrspAnnCont() + $scope.futureValueNonRegAnnCont() + $scope.futureValueTfsaAnnCont());
            var obsCurrVsContMsg = "";
            
            if ( curr > cont ) {
               var msg = "Test 1 - Your Current Holdings will be the signifcant portion of your investment money at retirement."
               return $scope.obsCurrVsContMsg = msg;
            }
            
            else if ( curr < cont ) {
                var msg = "Test 2 - You annual contributions represent a bigger portion of your retirement income, it's important you contineu to invest when possible"
                return $scope.obsCurrVsContMsg = msg;
            }
            
           
            
         }
                  
        

        

    }]);
