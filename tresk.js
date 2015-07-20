List=[];
update=0;
viewList=0;
 function grow(element) {
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";
						};
function allowDrop(ev) {
				ev.preventDefault();
	//	ev.target.parentNode.style.backgroundColor="grey";
						}

function drag(ev) {
					x=ev.dataTransfer.setData("text", ev.target.id);
					// ev.target.parentNode.style.backgroundColor="grey";
					update=ev.target.id;
	
					}
	

function drop(ev) {
				ev.preventDefault();
				var data = ev.dataTransfer.getData("text");
    
				for(var i=List.length-1;i>=0;i--){
				//alert(ev.target.id)	
				if(update===List[i].id)
					{
						List[i].pid=ev.target.id;
						//	viewList=List[i].id;
						}		
							}
				ev.target.setAttribute("borderRadius","20px");
					//	 ev.target.style.backgroundColor="#80CCE6";
					ev.target.appendChild(document.getElementById(data));
   
						}	
	
	// angular module
(function(){
 
				var app=angular.module("treskCtrl",[]);
				var count=0;
				var parentId=0;
				app.directive( 'tresk', function ( $compile ) {
				return {
				restrict: 'EA',
				scope: { text: '@' },
				templateUrl: 'buttons.html',
				controller: function ( $scope, $element ) {
						$scope.parentId=0;
						//add task
						$scope.add = function () {
						var el = $compile( "<container></container>" )( $scope );
						$element.parent().append( el );
						parentId++;
	
													};
						
						//delete all Tasks
						$scope.deleteAll=function(){
									
													var node=document.getElementsByClassName("container");
													var p=node.length-1;
													while(p+1>0)
														{
															node[p].parentNode.removeChild(node[p]);
															p--;
															}
												};
				}
			};
		});
			
			
			app.directive( 'container', function ( $compile ) {
   
				return {
						restrict: 'E',
						scope: { text: '@' },
						templateUrl: 'addTask.html',
						controller: function ( $scope) {
						$scope.parentName=[];
						$scope.parent=parentId-1;
						$scope.cId="c"+$scope.parent;
						$scope.showdiv=true;
		
						$scope.addTask=function(object){
														List.push(object);
														};	
   // $scope.list=$scope.show(viewList);
					
						$scope.remove=function(val){
									for(var i=0;i<List.length;i++)
										{				
											if(val.id===List[i].id && val.pid===$scope.parent)
												{
													List.splice(i,1);
												}
										}
								$scope.list=$scope.show($scope.parent);				
													};
													
						$scope.removeContainer=function(container,parent){
											var node=document.getElementById(container);
											node.parentNode.removeChild(node);
											$scope.removeAll(parent);
											}		
						$scope.getParent=function(val){
											$scope.parentName[$scope.parent]=val; 
											$scope.showdiv=false;
														};
						$scope.show=function(parent){ 
											this.small=[];
											for(var i=0;i<List.length;i++)
												{
													if(List[i].pid===parent)
														{
														this.small.push(List[i])
														}
														} 
													return this.small;
											};
											

						$scope.removeAll=function(parent){
										//alert($scope.parent);
											$scope.list=$scope.show($scope.parent);
										//	alert(List.length);
					
										for(var i=List.length-1;i>=0;i--)
												{
													//alert(parseInt(List[i].pid)===parseInt($scope.parent));
													//alert(i);
													if(parseInt(List[i].pid)===parseInt($scope.parent))
														{  	
															var child = document.getElementById(List[i].id);
																child.parentNode.removeChild(child);
																List.splice(i,1);
														}
														$scope.list=$scope.show($scope.parent);
				
				
												}
				// alert(List.length);
														};
							
						$scope.Create=function(x){
											
											taskid=x+count;
											$scope.addTask({name:x,id:taskid,pid:$scope.parent,modId:""+$scope.parent+taskid,dateCreated:Date.now()});
											// alert('asd');
											$scope.list=$scope.show($scope.parent);
											for(var i=0;i<document.getElementsByTagName("textarea").length;i++)
													{		document.getElementsByTagName("textarea")[i].value='';}
						
					count++;};
	  

				}
    };
  
});








})();