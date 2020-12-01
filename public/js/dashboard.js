

 var ctx = document.getElementById('myChart').getContext('2d');
 var ctx = $('#myChart');
 var ctx = 'myChart';

 var ctx = document.getElementById('myChart');

 $.ajax({
     url: "/dashboard/analytics",
     type: "GET",
     success: function (result) {
         console.log(result)
        var arr = [result.resume.Cashier, result.resume["Security Guard"],result.resume.Bagger,result.resume.Janitor,result.resume["Sales Lady"],result.resume["Sales Man"]]

         var myChart = new Chart(ctx, {
             type: 'bar',
             data: {
                 labels: ['Cashier', 'Security Guard', 'Bagger', 'Janitor', 'Sales Lady', 'Sales Man'],
                 datasets: [{
                     label: '# of Applicants',
                     data: arr,
                     backgroundColor: [
                         'rgba(255, 99, 132, 0.2)',
                         'rgba(54, 162, 235, 0.2)',
                         'rgba(255, 206, 86, 0.2)',
                         'rgba(75, 192, 192, 0.2)',
                         'rgba(153, 102, 255, 0.2)',
                         'rgba(255, 159, 64, 0.2)'
                     ],
                     borderColor: [
                         'rgba(255, 99, 132, 1)',
                         'rgba(54, 162, 235, 1)',
                         'rgba(255, 206, 86, 1)',
                         'rgba(75, 192, 192, 1)',
                         'rgba(153, 102, 255, 1)',
                         'rgba(255, 159, 64, 1)'
                     ],
                     borderWidth: 1
                 }]
             },
             options: {
                 scales: {
                     yAxes: [{
                         ticks: {
                             beginAtZero: true
                         }
                     }]
                 }
             }
         });



     }
 })
