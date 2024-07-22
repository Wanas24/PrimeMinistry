(function ($) {
  $.fn.menumaker = function (options) {
    var cssmenu = $(this),
      settings = $.extend(
        {
          title: "Menu",
          format: "dropdown",
          breakpoint: 1199,
          sticky: false,
        },
        options
      );

    return this.each(function () {
      cssmenu.find("li ul").parent().addClass("has-sub");
      if (settings.format != "select") {
        cssmenu.prepend('<div id="menu-button">' + settings.title + "</div>");
        $(this)
          .find("#menu-button")
          .on("click", function () {
            $(this).toggleClass("menu-opened");
            var mainmenu = $(this).siblings("ul"); // Change here to find sibling ul            console.log(mainmenu)
            if (mainmenu.hasClass("open")) {
              mainmenu.hide().removeClass("open");
            } else {
              mainmenu.show().addClass("open");
              if (settings.format === "dropdown") {
                mainmenu.find("ul").show();
              }
            }
          });

        multiTg = function () {
          cssmenu
            .find(".has-sub")
            .prepend('<span class="submenu-button"></span>');
          cssmenu.find(".submenu-button").on("click", function () {
            $(this).toggleClass("submenu-opened");
            const parentLi = $(this).closest(".has-sub");
            if (parentLi.find("ul").hasClass("open")) {
              parentLi.find("ul").removeClass("open").hide();
            } else {
              parentLi.find("ul").addClass("open").show();
            }
          });
        };

        if (settings.format === "multitoggle") multiTg();
        else cssmenu.addClass("dropdown");
      } else if (settings.format === "select") {
        cssmenu.append('<select style="width: 100%"/>').addClass("select-list");
        var selectList = cssmenu.find("select");
        selectList.append("<option>" + settings.title + "</option>", {
          selected: "selected",
          value: "",
        });
        cssmenu.find("a").each(function () {
          var element = $(this),
            indentation = "";
          for (i = 1; i < element.parents("ul").length; i++) {
            indentation += "-";
          }
          selectList.append(
            '<option value="' +
              $(this).attr("href") +
              '">' +
              indentation +
              element.text() +
              "</option"
          );
        });
        selectList.on("change", function () {
          window.location = $(this).find("option:selected").val();
        });
      }

      if (settings.sticky === true) cssmenu.css("position", "fixed");

      resizeFix = function () {
        if ($(window).width() > settings.breakpoint) {
          cssmenu.find("ul").show();
          cssmenu.removeClass("small-screen");
          if (settings.format === "select") {
            cssmenu.find("select").hide();
          } else {
            cssmenu.find("#menu-button").removeClass("menu-opened");
          }
        }

        if (
          $(window).width() <= settings.breakpoint &&
          !cssmenu.hasClass("small-screen")
        ) {
          cssmenu.find("ul").hide().removeClass("open");
          cssmenu.addClass("small-screen");
          if (settings.format === "select") {
            cssmenu.find("select").show();
          }
        }
      };
      resizeFix();
      return $(window).on("resize", resizeFix);
    });
  };
})(jQuery);






// $(document).ready(function () {
//   $("a.calculator-sub-toggle").on("click", function (e) {
//     e.preventDefault(); 
//     var submenu = $(this).next("ul");
//     var span = $(this).find("i");

    
//     if (submenu.hasClass("calculator-sub-closed")) {
//       submenu.removeClass("calculator-sub-closed").addClass("calculator-sub-open");
//       $(this).closest("li").removeClass("calculator-closed").addClass("calculator-open");
//       span.removeClass("fa-chevron-down").addClass("fa-chevron-up");
//     } else {
//       submenu.removeClass("calculator-sub-open").addClass("calculator-sub-closed");
//       $(this).closest("li").removeClass("calculator-open").addClass("calculator-closed"); 
//       span.removeClass("fa-chevron-up").addClass("fa-chevron-down"); 
//     }
//   });
// });


