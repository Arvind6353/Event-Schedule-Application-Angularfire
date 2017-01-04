'use strict';

angular.module('myApp.appointment', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/appointment', {
    templateUrl: 'appointment/appointment.html',
    controller: 'AppointmentCtrl'
  });
}])

.controller('AppointmentCtrl', ['$firebase','$scope','calendarConfig','ngToast',function($firebase,$scope,calendarConfig,ngToast) {



/*

  var ref = new Firebase("https://appointment-schedule-27532.firebaseio.com/");
  var sync = $firebase(ref);


  $scope.contacts = sync.$asArray();


$scope.isAdd=true;


  $scope.contactobj={name:"",email:"",mobile:""}


  $scope.addContact=function(){

	$scope.contact={name:$scope.contactobj.name,email:$scope.contactobj.email,mobile:$scope.contactobj.mobile}  	

	  $scope.contacts.$add($scope.contact);
		
	  alert("added");		

	  $scope.contactobj={name:"",email:"",mobile:""};

	

  }


$scope.doEdit=function(contact){

	$scope.isAdd=false;
	$scope.isEdit=true;

	$scope.contactEdit=contact;
	$scope.contactobj=contact;
  	
}

$scope.editContact=function(){


$scope.contactEdit.name=$scope.contactobj.name;

$scope.contactEdit.email=$scope.contactobj.email;

$scope.contactEdit.mobile=$scope.contactobj.mobile;

$scope.contacts.$save($scope.contactEdit);

	alert("updated ");

  $scope.contactobj={name:"",email:"",mobile:""}
}

$scope.deleteContact=function(contact){

	$scope.contacts.$remove(contact);
	alert("removed");

}


*/



  var ref = new Firebase("https://appointment-schedule-27532.firebaseio.com/events");
  var sync = $firebase(ref);

 $scope.events = sync.$asArray();


$scope.user={

name:"asdas"
}
  /*$scope.events.$watch(function(a) {
    console.log("watching ------------>"+a);
    if(a && a.event=="child_added")
    	{


    		var ind=_.findIndex($scope.events,{$id:a.key})
    		//$scope.events[ind]=eval(a.actions);
    	}



  });
*/
    //These variables MUST be set as a minimum for the calendar to work
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    var actions=$scope.actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\' id="editAction"></i>',
      onClick: function(args) {
        alert('Edited', args.calendarEvent);
      }
    }, {
      label: '<i class=\'glyphicon glyphicon-remove\' id="deleteAction"></i>',
      onClick: function(args) {
        
        $scope.events.$remove(args.calendarEvent,1);

        if($scope.events && $scope.events.length==0)
        	$scope.cellIsOpen = false;

        ngToast.danger("Event Removed Successfully ...");

      }
    }];


var json = JSON.stringify(actions, function(key, value) {
  if (typeof value === 'function') {
    return value.toString();
  } else {
    return value;
  }
});

console.log(json);




localStorage.setItem("actionElem",json);

$scope.eventSam1=[


{name:"asd"},
{name:"www"}

]
    $scope.eventSam = [
      {
        title: 'An event',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true
        
      }, {
        title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true
      }, {
        title: 'This is a really long event title that occurs on every year',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true
      }
    ];


	  


	

    //$scope.events=[];

    //$scope.cellIsOpen = true;

    $scope.addEvent = function() {
      
    	var type=$("#eventType").val();
    	var col;
    	if(type=="1")
    		col=calendarConfig.colorTypes.important;

    	if(type=="2")
    		col=calendarConfig.colorTypes.info;

		if(type=="3")
    		col=calendarConfig.colorTypes.warning;


		if(type=="4")
    		col=calendarConfig.colorTypes.danger;

    	$scope.eventobj.color=calendarConfig.colorTypes.danger;


      $scope.events.$add({
        title: $scope.eventobj.title,
        startsAt: $scope.eventobj.startsAt.getTime(),
        endsAt: $scope.eventobj.endsAt.getTime(),
        color: col,
        draggable: true,
        resizable: true,
        actions:JSON.stringify(actions)

      });





    	ngToast.create("Event Added Successfully ...");

	$scope.showAdd=false;

	$scope.eventobj={

		title:"",
		startsAt:"",
		endsAt:"",
		color:""
	}

	$("#eventType").val("0");

    };

    $scope.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    $scope.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    $scope.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    $scope.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    $scope.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    $scope.timespanClicked = function(date, cell) {

      if ($scope.calendarView === 'month') {
        if (($scope.cellIsOpen && moment(date).startOf('day').isSame(moment($scope.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          $scope.cellIsOpen = false;
        } else {
          $scope.cellIsOpen = true;
          $scope.viewDate = date;
        }
      } else if ($scope.calendarView === 'year') {
        if (($scope.cellIsOpen && moment(date).startOf('month').isSame(moment($scope.viewDate).startOf('month'))) || cell.events.length === 0) {
          $scope.cellIsOpen = false;
        } else {
          $scope.cellIsOpen = true;
          $scope.viewDate = date;
        }
      }

    };





/* Bindable functions
 -----------------------------------------------*/
$scope.endDateBeforeRender = endDateBeforeRender
$scope.endDateOnSetTime = endDateOnSetTime
$scope.startDateBeforeRender = startDateBeforeRender
$scope.startDateOnSetTime = startDateOnSetTime

function startDateOnSetTime () {
  $scope.$broadcast('start-date-changed');
}

function endDateOnSetTime () {
  $scope.$broadcast('end-date-changed');
}

function startDateBeforeRender ($dates) {
  if ($scope.dateRangeEnd) {
    var activeDate = moment($scope.dateRangeEnd);

    $dates.filter(function (date) {
      return date.localDateValue() >= activeDate.valueOf()
    }).forEach(function (date) {
      date.selectable = false;
    })
  }
}

function endDateBeforeRender ($view, $dates) {
  if ($scope.dateRangeStart) {
    var activeDate = moment($scope.dateRangeStart).subtract(1, $view).add(1, 'minute');

    $dates.filter(function (date) {
      return date.localDateValue() <= activeDate.valueOf()
    }).forEach(function (date) {
      date.selectable = false;
    })
  }
}


$scope.onTimeSet = function (newDate, oldDate) {
    // do something with new/old date as needed

   // close the dropdown with jQuery
  $('#dr').dropdown('toggle');
}


$scope.doDelete=function(ob){

	alert(ob);
}
}]);

function doDelete(obj){

alert(obj);

}