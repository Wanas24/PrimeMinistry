$(document).ready(function () {
  var ctxBar = document.getElementById('barChart').getContext('2d')
  var barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: [
        'نوعية الحياة',
        'بيئة مستدامة',
        'المورد والإبداع',
        'دور وجوه عالية',
        'الخدمات',
        'الصناعات',
        'الاستثمار'
      ],
      datasets: [
        {
          label: 'إنجاز',
          data: [50, 60, 70, 80, 90, 20, 110],
          maxBarThickness:9,
          barThickness:9,
          backgroundColor: '#50C979'
        },
        {
          label: 'قيد التنفيذ',
          barThickness:9,
          maxBarThickness:9,
          data: [20, 30, 40, 50, 60, 70, 80],
          backgroundColor: '#FFA500'
        },
        {
          label: 'متأخر',
          maxBarThickness:9,
          barThickness:9,
          data: [10, 20, 30, 40, 50, 60, 70],
          backgroundColor:  '#B22222'
        },
        {
          label: 'لم يبدأ بعد',
          barThickness:9,
          maxBarThickness:9,
          data: [5, 15, 25, 35, 45, 55, 65],
          backgroundColor:  '#BCB3B1'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          rtl: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding:  35
          }
        }
      }
    }
  })

  const doughnutLabelsLine = {
    id: 'doughnutLabelsLine',
    afterDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height }
      } = chart
      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
          const { x, y } = datapoint.tooltipPosition()
          
          const halfwidth = (width / 2 ) + 90; 
          const halfheight = height / 2;
          const xLine = x >= halfwidth ? x + 50 : x - 50
          const yLine = y >= halfheight ? y + 30 : y - 30
          const extraLine = x >= halfwidth ? 50 : -50
          ctx.beginPath()
          
          if (index === 3) {
            ctx.moveTo(x, y);
            ctx.lineTo((x - 10), yLine);
            ctx.lineTo((x - 50) , yLine);
          } else{
            ctx.moveTo(x, y);
            ctx.lineTo(xLine, yLine);
            ctx.lineTo(xLine + extraLine, yLine);

          }
          
          ctx.strokeStyle = '#033750'
          ctx.stroke();

          // Text
          const textWidth = ctx.measureText(chart.data.labels[index]).width
          ctx.font = '14px DIN-NEXT-MEDIUM'
          const textXPosition = x >= halfwidth ? 'left' : 'right'
          const addingSpace = x >= halfwidth ? 5 : -5
          ctx.textAlign = textXPosition
          ctx.textBaseline = 'middle'
          ctx.fillStyle = '#033750'

    
          if ( index === 3 ){
            ctx.fillText(
              chart.data.datasets[0].data[index] + ' %',
              (x - 80) - addingSpace,
              yLine
            )
          }
          else{
            ctx.fillText(
              chart.data.datasets[0].data[index] + ' %',
              xLine + extraLine + addingSpace,
              yLine
            )
          }
        })
      })
    }
  }

  // Pie Chart
  var ctxPie = document.getElementById('pieChart').getContext('2d')
  var pieChart = new Chart(ctxPie, {
    type: 'doughnut',
    data: {
      labels: ['إنجاز', 'قيد التنفيذ', 'متأخر', 'لم يبدأ بعد'],
      datasets: [
        {
          label: 'Progress Status',
          cutout: '70%',
          data: [16.9, 69.3, 11.8, 1.8],
          backgroundColor: ['#50C879', '#FFA500', '#B22222', '#BCB3B1']
        }
      ]
    },

    options: {
      layout: {
        padding: {
          top: 40, // Padding block (top)
          bottom: 30, // Padding block (bottom)
          left: 100, // Padding inline (left)
          right: 100 // Padding inline (right)
        }
      },  
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          rtl: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding:  35
          }
        }
      }
    },
    plugins: [doughnutLabelsLine]
  })
  function checkHover() {
    if ($(window).width() > 1200) {
      if ($('#cssmenu > ul > li a.active').parent().find('ul:hover').length > 0) {
        $('#cssmenu > ul > li a.active').addClass('hide-before')
      } else {
        $('#cssmenu > ul > li a.active').removeClass('hide-before')
      }
    } else {
      $('#cssmenu > ul > li a.active').removeClass('hide-before')
    }
  }

  // Bind hover events
  $('#cssmenu > ul > li a.active').parent().find('ul').hover(checkHover, checkHover)

  // Check hover state on window resize
  $(window).resize(checkHover)
  var targetElement = $('.flying-navigation')

  // Function to update opacity based on scroll position
  function updateOpacity() {
    if ($(window).scrollTop() > 0) {
      // targetElement.css('background-color', '#fff');
      targetElement.addClass('navigation-scrolled')
      // targetElement.css('z-index', '1000000');
    } else {
      // targetElement.css('background-color', 'transparent');
      targetElement.removeClass('navigation-scrolled')
      // targetElement.css('z-index', '10000');
    }
  }

  // Call the function on page load
  updateOpacity()

  // Call the function on scroll
  $(window).scroll(function () {
    updateOpacity()
  })
  $('.first-navigation-links-container > button').click(() => {
    $('.searchBarOpen').addClass('search-active')
  })
  $('.search-btn-flying-navbar').click(() => {
    $('.searchBarOpen').addClass('search-active')
  })
  $('.searchBarOpen--closeBtn').click(() => {
    $('.searchBarOpen').removeClass('search-active')
  })

  $('.dropdown.signin-btn > .dropdown-toggle').click(function () {
    // Remove menu-opened class from #menu-button
    $('#menu-button').removeClass('menu-opened')

    // Remove open class from #cssmenu ul
    $('#cssmenu ul').removeClass('open')

    // Remove display block from #cssmenu ul
    $('#cssmenu ul').css('display', '')

    // Add your further actions here if needed
  })
  $('.dropdown.signin-btn > .dropdown-toggle').click(function () {
    // Remove menu-opened class from #menu-button
    $('#menu-button').removeClass('menu-opened')

    // Remove open class from #cssmenu ul
    $('.cssmenu2 ul').removeClass('open')

    // Remove display block from #cssmenu ul
    $('.cssmenu2 ul').css('display', '')

    // Add your further actions here if needed
  })

  $(this).find('.fa-plus').show()
  $(this).find('.fa-minus').hide()

  $('.cssmenu2').menumaker({
    title: '',
    format: 'multitoggle'
  })

  // Footer
  $('.toggleButton').click(function () {
    // Check if the window width is less than or equal to 991px
    if ($(window).width() <= 991) {
      // Toggle the visibility of the target element using classes
      $(this).closest('div').next('ul').toggleClass('show')
      // Toggle the icon based on the presence of the 'show' class
      if ($(this).closest('.footer-item').find('ul').hasClass('show')) {
        $(this).find('.fa-plus').hide()
        $(this).find('.fa-minus').show()
      } else {
        $(this).find('.fa-plus').show()
        $(this).find('.fa-minus').hide()
      }
    }
  })
  // Back to top
  $('.backtotop-box').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'fast')
  })
})

// Navbar
$('.nav-link').click(function () {
  $('.nav-link').removeClass('active')
  $(this).addClass('active')
})

$('.search-icon').click(function () {
  $('.nav-search').addClass('active')
  $('.navbar-search-bar-container').addClass('active')
})

$('.close-icon').click(function () {
  $('.nav-search').removeClass('active')
  $('.navbar-search-bar-container').removeClass('active')
})

$(document).ready(function () {
  $('.has-sub').click(function () {
    // Check if the submenu is already open
    var isOpen = $(this).find('ul').hasClass('open')

    // Close all other submenus
    $('li.has-sub > span.submenu-button').removeClass('submenu-opened')
    $('li.has-sub > ul').removeClass('open').css('display', '')

    // Toggle the submenu state
    if (isOpen) {
      $(this).find('ul').addClass('open').css('display', 'block')
      $(this).find('span.submenu-button').addClass('submenu-opened')
    }
  })
})
