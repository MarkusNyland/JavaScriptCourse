//Budget controller
var budgetController = (function () {

  var Expense = function (id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {

      if (totalIncome > 0) {
          this.percentage = Math.round((this.value / totalIncome) * 100);
      }

  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  var Income = function (id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
  };

  var calculateTotal = function (type) {

      var sum = 0;

      data.allItems[type].forEach(function (current) {
          sum += current.value;
      });

      data.totals[type] = sum;
  };

    var data = {

        allItems: {
            expense: [],
            income: []
        },

        totals: {
            expense: 0,
            income: 0
        },

        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {

            var newItem, ID;

            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            else ID = 0;


            if(type === 'expense'){
                newItem = new Expense(ID, des, val);
            }

            else if(type === 'income'){
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem: function (type, id){

            var index, ids;

            ids = data.allItems[type].map(function (current) {
               return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1){
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function () {

            calculateTotal('expense');
            calculateTotal('income');

            data.budget = data.totals.income - data.totals.expense;

            if (data.totals.expense === 0){
                data.percentage = -1;
            }
            else {
                data.percentage = Math.round((data.totals.expense / data.totals.income) * 100);

            }

        },

        calculatePercentages: function() {

            data.allItems.expense.forEach(function (current) {
                current.calcPercentage(data.totals.income);
            })

        },

        getPercentages: function() {

            return allPerc = data.allItems.expense.map(function (current) {
                return current.getPercentage();
            });

        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.income,
                totalExp: data.totals.expense,
                percentage: data.percentage
            }
        }
    }

})();

//UI controller
var UIController = (function () {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month',
        inputButton: '.add__btn'

    };

    var formatNumber = function(type, number){

        number = Math.abs(number);
        number = number.toFixed(2);
        if (number.length > 6){
            number = number.substr(0, number.length - 6) + ',' + number.substr(number.length - 6, number.length - (number.length -6));
        }

        return (type === 'income' ? '+ ' : '- ') + number;

    };

    var nodeListForEach = function(list, callback) {

        for (var i = 0; i < list.length; i++){
            callback(list[i], i);
        }

    };

    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
                incomeContainer: document.querySelector(DOMStrings.incomeContainer).value,
                expensesContainer: document.querySelector(DOMStrings.expensesContainer).value
            }

        },

        addListItem: function(obj, type) {

            var html, newHtml, element;

            if (type === 'income'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix">' +
                    '<div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn">' +
                    '<i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if (type === 'expense') {
                element = DOMStrings.expensesContainer;
            html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix">' +
                    '<div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(type, obj.value));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function(selectorID){

            var element;

            element = document.getElementById(selectorID);

            element.parentNode.removeChild(element);

        },

        clearFields: function() {
            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function (current, index, array) {
                current.value = '';
            });

            fieldsArray[0].focus();
        },

        displayBudget: function(obj){

            var type;
            obj.budget > 0 ? type = 'income' : type = 'expense';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(type, obj.budget);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber('income', obj.totalInc);
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber('expense', obj.totalExp);

            if (obj.percentage > 0){
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            }
            else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }


        },

        displayMonth: function(){

            var now, year, month, months;

            now = new Date();

            months = ['Januar ', 'Februar ', 'Mars ', 'April ', 'Mai ', 'Juni ', 'Juli ', 'August ', 'September ',  'Oktober ', 'November ', 'Desember '];
            month = months[now.getMonth()];

            year = now.getFullYear();

            document.querySelector(DOMStrings.dateLabel).textContent = month + year;

        },

        displayPercentages: function(percentages){

            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

            nodeListForEach(fields, function (current, index) {
                var currentPerc = percentages[index];

                if (currentPerc > 0){
                    current.textContent = currentPerc + '%';
                }
                else {
                    current.textContent = '---';
                }

            });

        },

        changedType: function() {

            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' + DOMStrings.inputDescription + ',' + DOMStrings.inputValue
            );

            nodeListForEach(fields, function (current) {
                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.inputButton).classList.toggle('red');

        },

        getDOMStrings: function () {

            return DOMStrings;
        }
    }

})();

//Global app controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMStrings();

        document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };

    var updateBudget = function () {

        budgetCtrl.calculateBudget();
        // Calculate the budget

        var budget = budgetCtrl.getBudget();
        // Return the budget

        UICtrl.displayBudget(budget);
        // Display the budget on the UI

    };

    var updatePercentages = function () {

        budgetCtrl.calculatePercentages();

        var percentages = budgetCtrl.getPercentages();

        console.log(percentages);

        UICtrl.displayPercentages(percentages);

    };

    var ctrlAddItem = function () {

        // get the field input data
        var input = UICtrl.getInput();

        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

            // add item to budget controller
            var newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //Clear the fields
            UICtrl.clearFields();

            // Calculate and update budget
            updateBudget();

            //Calculate and update the percentages
            updatePercentages();
        }

    };

    var ctrlDeleteItem = function (event) {

        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
        }

        budgetCtrl.deleteItem(type,ID);

        UICtrl.deleteListItem(itemID);

        updateBudget();

        //Calculate and update the percentages
        updatePercentages();
    };

    return {
        init: function () {
            console.log('Application has started');
            UICtrl.displayMonth();
            updateBudget({
                budget: 0,
                    totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }


})(budgetController, UIController);

controller.init();

