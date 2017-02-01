angular
  .module('clementine')
  .controller('companyDashCtrl', companyDashCtrl);

companyDashCtrl.$inject = ['User','Company', '$stateParams', '$http', 'API', '$scope'];
function companyDashCtrl(User, Company, $stateParams, $http, API, $scope) {
  const vm = this;
  vm.kek = 'LOL';
  vm.company;
  //fetch the user.
  $http({
    method: 'GET',
    url: `${API}/users/${$stateParams.id}`
  }).then((data) => {
    vm.user = data;
  });
  //and the company
  $http({
    method: 'GET',
    url: `${API}/companies/${$stateParams.company_id}`
  }).then((data)=> {
    vm.company = data;
    ideaRanker(data.data.ideas);
    $scope.list = data.data.ideas;
    console.log($scope.list);
  });

}

function knuthShuffle(array) {
  var a = array;
  var n = a.length;
  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function setOrder(order, array) {
  console.log('set order');
  if (order === 'rand') {
    return true;
  }
}

//Work out the super clever 'ideaScore' rating of each idea lol.
function ideaRanker(ideas) {
  if (typeof(ideas) !== 'object') throw 'Ideas should be an object';
  for (var i = 0; i < ideas.length; i++) {
    emptyChecker(ideas[i]);
    ideas[i].engage = ideas[i].upvotes + ideas[i].downvotes;
    ideas[i].score  = ideas[i].upvotes - ideas[i].downvotes;
  }
}

//test for empty array and rpelace with 0, else assign no votes.
function emptyChecker(idea) {
  if (idea.upvotes.length === 0) idea.upvotes = 0;
  else idea.upvotes = idea.upvotes.length;
  if (idea.downvotes.length === 0) idea.downvotes = 0;
  else idea.downvotes = idea.downvotes.length;
}
