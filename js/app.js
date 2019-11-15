/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function _init(){"use strict";$.AdminLTE.layout={activate:function(){var a=this;a.fix(),a.fixSidebar(),$("body, html, .wrapper").css("height","auto"),$(window,".wrapper").resize(function(){a.fix(),a.fixSidebar()})},fix:function(){$(".layout-boxed > .wrapper").css("overflow","hidden");var a=$(".main-footer").outerHeight()||0,b=$(".main-header").outerHeight()+a,c=$(window).height(),d=$(".sidebar").height()||0;if($("body").hasClass("fixed"))$(".content-wrapper, .right-side").css("min-height",c-a);else{var e;c>=d?($(".content-wrapper, .right-side").css("min-height",c-b),e=c-b):($(".content-wrapper, .right-side").css("min-height",d),e=d);var f=$($.AdminLTE.options.controlSidebarOptions.selector);"undefined"!=typeof f&&f.height()>e&&$(".content-wrapper, .right-side").css("min-height",f.height())}},fixSidebar:function(){return $("body").hasClass("fixed")?("undefined"==typeof $.fn.slimScroll&&window.console&&window.console.error("Error: the fixed layout requires the slimscroll plugin!"),void($.AdminLTE.options.sidebarSlimScroll&&"undefined"!=typeof $.fn.slimScroll&&($(".sidebar").slimScroll({destroy:!0}).height("auto"),$(".sidebar").slimScroll({height:$(window).height()-$(".main-header").height()+"px",color:"rgba(0,0,0,0.2)",size:"3px"})))):void("undefined"!=typeof $.fn.slimScroll&&$(".sidebar").slimScroll({destroy:!0}).height("auto"))}},$.AdminLTE.pushMenu={activate:function(a){var b=$.AdminLTE.options.screenSizes;$(document).on("click",a,function(a){a.preventDefault(),$(window).width()>b.sm-1?$("body").hasClass("sidebar-collapse")?$("body").removeClass("sidebar-collapse").trigger("expanded.pushMenu"):$("body").addClass("sidebar-collapse").trigger("collapsed.pushMenu"):$("body").hasClass("sidebar-open")?$("body").removeClass("sidebar-open").removeClass("sidebar-collapse").trigger("collapsed.pushMenu"):$("body").addClass("sidebar-open").trigger("expanded.pushMenu")}),$(".content-wrapper").click(function(){$(window).width()<=b.sm-1&&$("body").hasClass("sidebar-open")&&$("body").removeClass("sidebar-open")}),($.AdminLTE.options.sidebarExpandOnHover||$("body").hasClass("fixed")&&$("body").hasClass("sidebar-mini"))&&this.expandOnHover()},expandOnHover:function(){var a=this,b=$.AdminLTE.options.screenSizes.sm-1;$(".main-sidebar").hover(function(){$("body").hasClass("sidebar-mini")&&$("body").hasClass("sidebar-collapse")&&$(window).width()>b&&a.expand()},function(){$("body").hasClass("sidebar-mini")&&$("body").hasClass("sidebar-expanded-on-hover")&&$(window).width()>b&&a.collapse()})},expand:function(){$("body").removeClass("sidebar-collapse").addClass("sidebar-expanded-on-hover")},collapse:function(){$("body").hasClass("sidebar-expanded-on-hover")&&$("body").removeClass("sidebar-expanded-on-hover").addClass("sidebar-collapse")}},$.AdminLTE.tree=function(a){var b=this,c=$.AdminLTE.options.animationSpeed;$(document).off("click",a+" li a").on("click",a+" li a",function(a){var d=$(this),e=d.next();if(e.is(".treeview-menu")&&e.is(":visible")&&!$("body").hasClass("sidebar-collapse"))e.slideUp(c,function(){e.removeClass("menu-open")}),e.parent("li").removeClass("active");else if(e.is(".treeview-menu")&&!e.is(":visible")){var f=d.parents("ul").first(),g=f.find("ul:visible").slideUp(c);g.removeClass("menu-open");var h=d.parent("li");e.slideDown(c,function(){e.addClass("menu-open"),f.find("li.active").removeClass("active"),h.addClass("active"),b.layout.fix()})}e.is(".treeview-menu")&&a.preventDefault()})},$.AdminLTE.controlSidebar={activate:function(){var a=this,b=$.AdminLTE.options.controlSidebarOptions,c=$(b.selector),d=$(b.toggleBtnSelector);d.on("click",function(d){d.preventDefault(),c.hasClass("control-sidebar-open")||$("body").hasClass("control-sidebar-open")?a.close(c,b.slide):a.open(c,b.slide)});var e=$(".control-sidebar-bg");a._fix(e),$("body").hasClass("fixed")?a._fixForFixed(c):$(".content-wrapper, .right-side").height()<c.height()&&a._fixForContent(c)},open:function(a,b){b?a.addClass("control-sidebar-open"):$("body").addClass("control-sidebar-open")},close:function(a,b){b?a.removeClass("control-sidebar-open"):$("body").removeClass("control-sidebar-open")},_fix:function(a){var b=this;if($("body").hasClass("layout-boxed")){if(a.css("position","absolute"),a.height($(".wrapper").height()),b.hasBindedResize)return;$(window).resize(function(){b._fix(a)}),b.hasBindedResize=!0}else a.css({position:"fixed",height:"auto"})},_fixForFixed:function(a){a.css({position:"fixed","max-height":"100%",overflow:"auto","padding-bottom":"50px"})},_fixForContent:function(a){$(".content-wrapper, .right-side").css("min-height",a.height())}},$.AdminLTE.boxWidget={selectors:$.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,icons:$.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,animationSpeed:$.AdminLTE.options.animationSpeed,activate:function(a){var b=this;a||(a=document),$(a).on("click",b.selectors.collapse,function(a){a.preventDefault(),b.collapse($(this))}),$(a).on("click",b.selectors.remove,function(a){a.preventDefault(),b.remove($(this))})},collapse:function(a){var b=this,c=a.parents(".box").first(),d=c.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");c.hasClass("collapsed-box")?(a.children(":first").removeClass(b.icons.open).addClass(b.icons.collapse),d.slideDown(b.animationSpeed,function(){c.removeClass("collapsed-box")})):(a.children(":first").removeClass(b.icons.collapse).addClass(b.icons.open),d.slideUp(b.animationSpeed,function(){c.addClass("collapsed-box")}))},remove:function(a){var b=a.parents(".box").first();b.slideUp(this.animationSpeed)}}}if("undefined"==typeof jQuery)throw new Error("AdminLTE requires jQuery");$.AdminLTE={},$.AdminLTE.options={navbarMenuSlimscroll:!0,navbarMenuSlimscrollWidth:"3px",navbarMenuHeight:"200px",animationSpeed:500,sidebarToggleSelector:"[data-toggle='offcanvas']",sidebarPushMenu:!0,sidebarSlimScroll:!0,sidebarExpandOnHover:!1,enableBoxRefresh:!0,enableBSToppltip:!0,BSTooltipSelector:"[data-toggle='tooltip']",enableFastclick:!1,enableControlTreeView:!0,enableControlSidebar:!0,controlSidebarOptions:{toggleBtnSelector:"[data-toggle='control-sidebar']",selector:".control-sidebar",slide:!0},enableBoxWidget:!0,boxWidgetOptions:{boxWidgetIcons:{collapse:"fa-minus",open:"fa-plus",remove:"fa-times"},boxWidgetSelectors:{remove:'[data-widget="remove"]',collapse:'[data-widget="collapse"]'}},directChat:{enable:!0,contactToggleSelector:'[data-widget="chat-pane-toggle"]'},colors:{lightBlue:"#3c8dbc",red:"#f56954",green:"#00a65a",aqua:"#00c0ef",yellow:"#f39c12",blue:"#0073b7",navy:"#001F3F",teal:"#39CCCC",olive:"#3D9970",lime:"#01FF70",orange:"#FF851B",fuchsia:"#F012BE",purple:"#8E24AA",maroon:"#D81B60",black:"#222222",gray:"#d2d6de"},screenSizes:{xs:480,sm:768,md:992,lg:1200}},$(function(){"use strict";$("body").removeClass("hold-transition"),"undefined"!=typeof AdminLTEOptions&&$.extend(!0,$.AdminLTE.options,AdminLTEOptions);var a=$.AdminLTE.options;_init(),$.AdminLTE.layout.activate(),a.enableControlTreeView&&$.AdminLTE.tree(".sidebar"),a.enableControlSidebar&&$.AdminLTE.controlSidebar.activate(),a.navbarMenuSlimscroll&&"undefined"!=typeof $.fn.slimscroll&&$(".navbar .menu").slimscroll({height:a.navbarMenuHeight,alwaysVisible:!1,size:a.navbarMenuSlimscrollWidth}).css("width","100%"),a.sidebarPushMenu&&$.AdminLTE.pushMenu.activate(a.sidebarToggleSelector),a.enableBSToppltip&&$("body").tooltip({selector:a.BSTooltipSelector,container:"body"}),a.enableBoxWidget&&$.AdminLTE.boxWidget.activate(),a.enableFastclick&&"undefined"!=typeof FastClick&&FastClick.attach(document.body),a.directChat.enable&&$(document).on("click",a.directChat.contactToggleSelector,function(){var a=$(this).parents(".direct-chat").first();a.toggleClass("direct-chat-contacts-open")}),$('.btn-group[data-toggle="btn-toggle"]').each(function(){var a=$(this);$(this).find(".btn").on("click",function(b){a.find(".btn.active").removeClass("active"),$(this).addClass("active"),b.preventDefault()})})}),function(a){"use strict";a.fn.boxRefresh=function(b){function c(a){a.append(f),e.onLoadStart.call(a)}function d(a){a.find(f).remove(),e.onLoadDone.call(a)}var e=a.extend({trigger:".refresh-btn",source:"",onLoadStart:function(a){return a},onLoadDone:function(a){return a}},b),f=a('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');return this.each(function(){if(""===e.source)return void(window.console&&window.console.log("Please specify a source first - boxRefresh()"));var b=a(this),f=b.find(e.trigger).first();f.on("click",function(a){a.preventDefault(),c(b),b.find(".box-body").load(e.source,function(){d(b)})})})}}(jQuery),function(a){"use strict";a.fn.activateBox=function(){a.AdminLTE.boxWidget.activate(this)},a.fn.toggleBox=function(){var b=a(a.AdminLTE.boxWidget.selectors.collapse,this);a.AdminLTE.boxWidget.collapse(b)},a.fn.removeBox=function(){var b=a(a.AdminLTE.boxWidget.selectors.remove,this);a.AdminLTE.boxWidget.remove(b)}}(jQuery),function(a){"use strict";a.fn.todolist=function(b){var c=a.extend({onCheck:function(a){return a},onUncheck:function(a){return a}},b);return this.each(function(){"undefined"!=typeof a.fn.iCheck?(a("input",this).on("ifChecked",function(){var b=a(this).parents("li").first();b.toggleClass("done"),c.onCheck.call(b)}),a("input",this).on("ifUnchecked",function(){var b=a(this).parents("li").first();b.toggleClass("done"),c.onUncheck.call(b)})):a("input",this).on("change",function(){var b=a(this).parents("li").first();b.toggleClass("done"),a("input",b).is(":checked")?c.onCheck.call(b):c.onUncheck.call(b)})})}}(jQuery);_init();

var BASEURL = "apis/";

function jqueryAjax(url, param, callback, errorFn) {
    jQuery.ajax({
        url: BASEURL + url,
        cache: false,
        dataType: "json",
        data: param,
        success: callback,
        error: function(xhr) {
            oLoadingDiv.hide();
            if (errorFn) {
                errorFn(xhr);
            }
        }
    });
}

function showMessagePop(title, message) {
    $('#res_message_pop #mes-modal-title').html(title);
    $('#res_message_pop #mes-modal-body').html(message);
    $('#res_message_pop').modal('show');
}

LoadingBox = function() {
    this.show = function(message) {
        if (message) {
            $("#loading_modal .modal-header > h4").text(message);
        }
        if ($('#loading_modal').is(':visible')) {
            return;
        }
        $("#loading_modal .modal-dialog").css("margin-top", Math.max(0, ($(window).height() - $("#loading_modal .modal-dialog").height()) / 2))
        $("#loading_modal").modal({
            backdrop: 'static',
            keyboard: false
        });
    };
    this.hide = function() {
        var width = 60;
        var interval = setInterval(function() {
            width = width + 10;
            $("#loading_modal .progress-bar").css("width", width + "%");
            if (width === 130) {
                $("#loading_modal").modal("hide");
                clearInterval(interval);
                $("#loading_modal .progress-bar").css("width", "60%");
            }
        }, 150);
    };
};
var oLoadingDiv = new LoadingBox();

function getParamObj($container) {
    var param = new Object();
    $("input[type=text],input[type=tel],input[type=hidden],input[type=password],select,input[type=checkbox]:checked,input[type=radio]:checked,textarea", $container).each(function() {
        var $this = $(this);
        if ($this.attr('name') && $this.attr('name').length > 0) {
            if ($this.attr('data-type') && $this.attr('data-type') == "int") {
                param[$this.attr('name')] = $this.val().length > 0 ? parseInt($.trim($this.val())) : 0;
            } else {
                param[$this.attr('name')] = $.trim($this.val());
            }
        }
    });
    return param;
}

function validateRequiredField($container) {
    var isValid = true;
    $("[required]", $container).each(function() {
        if ($.trim($(this).val()).length == 0) {
            $(this).closest(".form-group").addClass("has-error");
            isValid = false;
        }
    });
    $(".has-error [required]", $container).on("focus", function() {
        $(this).closest(".has-error").removeClass("has-error");
    });
    $(".has-error [required]~.select2.select2-container", $container).on("click", function() {
        $(this).closest(".has-error").removeClass("has-error");
    });
    return isValid;
}

function initCalendarEvents() {
    $('#sandbox-container div').datepicker({
        todayBtn: "linked",
        todayHighlight: true,
        defaultDate: new Date(),
        format: "dd-mm-yyyy",
        allowInputToggle: true
    }).on("changeDate", function(e) {
        $('#calendar').fullCalendar('gotoDate', e.date);
        $('#calendar').fullCalendar('changeView', 'agendaDay');
    });

    var $eventModal = $("#addEvent");

    $(".date", $eventModal).datepicker({
        format: "dd-mm-yyyy",
        defaultDate: new Date(),
        forceParse: false
    }).on('show', function() {
        if ($(this).find("input").prop('disabled')) {
            $(this).datepicker('hide');
        }
    }).on('changeDate', function(ev) {
        $(this).datepicker('hide');
    });

    $("[name='starttime'],[name='endtime'],[name='final_starttime'],[name='final_endtime']", $eventModal).timepicker({
        minuteStep: 1,
        template: 'dropdown',
//        appendWidgetTo: 'body',
//        showSeconds: true,
        showMeridian: true,
        defaultTime: "current"
    });

    var fillEventObj = function(temp) {
        var color = temp.stateDesc == "OPEN" ? "#f39c12" : temp.stateDesc == "VISITED" ? "#0073b7" : temp.stateDesc == "CLOSED" ? "#00a65a" : "#f56954";
        var data = temp;
        data = $.extend(data, {
            start: moment(temp.startdate.date),
            end: moment(temp.enddate.date),
            allDay: temp.allDay == "1",
            backgroundColor: color,
            borderColor: color
        });
        return data;
    };

    var getAllEvents = function() {
        oLoadingDiv.show("Getting Visit Data");
        jqueryAjax("calendarevents.php", {"action": "getallevents"}, function(res) {
            oLoadingDiv.hide();
            if (res.STATUS !== 1) {
                showMessagePop("Error", res.MESSAGE);
                return;
            }
//            parseEntityData(res);
//            parseProductData(res);
            if (!res.DATA.events) {
                return;
            }
            var data = [];
            for (var i = 0; i < res.DATA.events.length > 0; i++) {
                data[i] = fillEventObj(res.DATA.events[i]);
            }
            $('#calendar').fullCalendar('removeEvents');
            $('#calendar').fullCalendar('addEventSource', data);
        });
    };
    getAllEvents();

//    var parseEntityData = function(res) {
//        if (res.STATUS !== 1 || !res.DATA.entities) {
//            return;
//        }
//        var $option;
//        $("#visit [name='contact'],#visit [name='location']", $eventModal).html("");
//        for (var i = 0; i < res.DATA.entities.length; i++) {
//            $option = $("<option />").attr("value", res.DATA.entities[i].id).text(res.DATA.entities[i].name);
//            $("#visit [name='contact'],#visit [name='location']", $eventModal).append($option);
//        }
//    };

    $.fn.select2.defaults.set("width", "100%");
    $.fn.modal.Constructor.prototype.enforceFocus = function() {
    };

    var enableSelect2 = function($container, action) {
       $container.select2({
           ajax: {
               url: BASEURL + "calendarevents.php",
               dataType: 'json',
               delay: 250,
                data: function(params) {
                    return {
                        action: action,
                        q: params.term, // search term
                        page: params.page || 1,
                        location: $("#visit [name='location']", $eventModal).val(),
                        specialty: $("#visit [name='specialty']", $eventModal).val()
                    };
                },
               processResults: function(data, params) {
                   params.page = params.page || 1;
                    if (data.DATA && action == "getcontacts" && $container.closest(".meeting-notes").length > 0) {
                        var contacts = $("#visit [name='contact']", $eventModal).val();
                        data.DATA = data.DATA.filter(function(cur) {
                            return contacts.indexOf(cur.id + "") != -1;
                        });
                    }
                   return {
                       results: data.DATA || [],
                       pagination: {
                           more: data.DATA && data.DATA.length === 10
                       }
                   };
               },
               cache: true
           },
           escapeMarkup: function(markup) {
               return markup;
           }, // let our custom formatter work
           minimumInputLength: 0,
           placeholder: "Select Value",
           allowClear: true,
           templateResult: function(repo) {
               if (repo.loading)
                   return repo.text;

               var markup = "<div class='select2-result-repository clearfix'>" +
                       "<div class='select2-result-repository__title'>" + repo.name + "</div>";
               if (action == "getcontacts" || action == "getlocations") {
                   markup += "<div class='select2-result-repository__description'>" + repo.nif + "</div>";
               }
               return markup;
           },
           templateSelection: function(repo) {
               if (repo.name) return repo.name;
                return repo.text;
           }
       }).on("select2:selecting", function(e) {
           setTimeout(function() {
               $container.siblings(".select2.select2-container").find(".select2-selection__rendered")[0].childNodes[1].nodeValue = e.params.args.data.name;
           }, 101);
       }).on("select2:unselecting", function(e) {
           setTimeout(function() {
               $container.siblings(".select2.select2-container").find(".select2-selection__placeholder").text($container.attr("data-placeholder"));
           }, 101);
       });
       $container.siblings(".select2.select2-container").find(".select2-selection__placeholder").text($container.attr("data-placeholder"));
   };

    enableSelect2($("#visit [name='contact']", $eventModal), "getcontacts");
    enableSelect2($("#visit [name='location']", $eventModal), "getlocations");
    enableSelect2($("#visit [name='specialty']", $eventModal), "getspecialties");
    
    var onClearFieldClick = function() {
        var $container = $(this).siblings("select");
//        $(" > option", $container).attr("value", "").text("").trigger('click');
        $container.select2('data', null);
        $container.empty().trigger("change");
        setTimeout(function() {
            $container.siblings(".select2.select2-container").find(".select2-selection__rendered").html('<span class="select2-selection__placeholder">' + $container.attr("data-placeholder") + '</span>');
        }, 102);
    };
    $eventModal.on("click", ".clear-field", onClearFieldClick);
    
    var onLocationSpecialtyChange = function() {
        $("#visit [name='contact']", $eventModal).empty().trigger("change");
        $("#visit [name='contact']", $eventModal).select2('data', null);
    };
    $("#visit [name='location']", $eventModal).on("change", onLocationSpecialtyChange);
    $("#visit [name='specialty']", $eventModal).on("change", onLocationSpecialtyChange);
    
    var onSelectAllVisitContacts = function() {
        var $container = $(this).siblings("select");
        $container.empty().trigger("change");
        $container.select2('data', null);
        if ($container.data("data")) {
            var data = JSON.parse($container.data("data"));
            $("option:first", $container).nextAll().remove();
            for (var i = 0; i < data.length; i++) {
                $container.append("<option selected='selected' value='" + data[i].id + "'>" + data[i].name + "</option>");
            }
            return;
        }
        jqueryAjax("calendarevents.php", {"action": "getcontacts"}, function(res) {
            if (res.STATUS !== 1) {
                showMessagePop("Error", res.MESSAGE);
                return;
            }
            if (!res.DATA) {
                return;
            }
            $("option:first", $container).nextAll().remove();
            for (var i = 0; i < res.DATA.length; i++) {
                $container.append("<option selected='selected' value='" + res.DATA[i].id + "'>" + res.DATA[i].name + "</option>");
            }
            $container.data("data", JSON.stringify(res.DATA));
        });
    };
    $eventModal.on("click", "#visit .select-all", onSelectAllVisitContacts);
    
    var onSelectAllMeetingContacts = function() {
        var $container = $(this).siblings("select");
        var visitContacts = $("#visit [name='contact']", $eventModal).val();
        $container.empty().trigger("change");
        $container.select2('data', null);
        jqueryAjax("calendarevents.php", {"action": "getcontacts", "id": visitContacts.toString()}, function(res) {
            if (res.STATUS !== 1) {
                showMessagePop("Error", res.MESSAGE);
                return;
            }
            if (!res.DATA) {
                return;
            }
            $("option:first", $container).nextAll().remove();
            for (var i = 0; i < res.DATA.length; i++) {
                $container.append("<option selected='selected' value='" + res.DATA[i].id + "'>" + res.DATA[i].name + "</option>");
            }
            $container.data("data", JSON.stringify(res.DATA));
        });
    };
    $eventModal.on("click", "#report .select-all", onSelectAllMeetingContacts);
    
    var onAddNewNoteClick = function(data) {
        var $this = $("#report .meeting-notes .emty-tab-li.hidden", $eventModal);
        var $tabLi = $this.clone();
        var meetingNo = $this.siblings().length + 1;
        $tabLi.removeClass("emty-tab-li hidden").find("a").attr("href", "#meeting" + meetingNo).text("Meeting Note " + meetingNo);
        $this.before($tabLi);
        var $tabContent = $("#report .empty-note-tab", $eventModal).clone();
        $tabContent.removeClass("empty-note-tab hidden").attr("id", "meeting" + meetingNo);
        $("#report .empty-note-tab").before($tabContent);
        $tabContent.after("<div class='clearfix'></div>");
        $("#report .meeting-notes").removeClass("hidden").addClass("show");
        $("a", $tabLi).trigger("click");
        initTabFunctionalities($tabContent, data);
    };
    $("#report .add-new-note", $eventModal).on("click", onAddNewNoteClick);
    
    var initTabFunctionalities = function($container, data) {
        enableSelect2($("[name='contact']", $container), "getcontacts");
        enableSelect2($("[name='product']", $container), "getproducts");
        $(".date", $container).datepicker({
            format: "dd-mm-yyyy",
            defaultDate: new Date(),
            forceParse: false
        }).on('show', function() {
            if ($(this).find("input").prop('disabled')) {
                $(this).datepicker('hide');
            }
        }).on('changeDate', function(ev) {
            $(this).datepicker('hide');
        });

        $("[name='final_starttime'],[name='final_endtime']", $container).timepicker({
            minuteStep: 1,
            template: 'dropdown',
//        appendWidgetTo: 'body',
//        showSeconds: true,
            showMeridian: true,
            defaultTime: "current"
        });
        var visitSD = $("#visit [name='startdate']", $eventModal).val().split("-");
        visitSD = visitSD[2] + "/" + visitSD[1] + "/" + visitSD[0];
        var visitED = $("#visit [name='enddate']", $eventModal).val().split("-");
        visitED = visitED[2] + "/" + visitED[1] + "/" + visitED[0];
        $("[name='final_startdate']", $container).val(moment(visitSD).format("DD-MM-YYYY"));
        $("[name='final_starttime']", $container).timepicker('setTime', moment($("#visit [name='starttime']", $eventModal).val(), "HH:mm a").format("LT"));
        if ($("#visit [name='allday']", $eventModal).is(":checked")) {
            $("[name='final_enddate']", $container).val(moment(visitSD).format("DD-MM-YYYY"));
            $("[name='final_endtime']", $container).timepicker('setTime', moment($("#visit [name='starttime']", $eventModal).val(), "HH:mm a").format("LT"));
        } else {
            $("[name='final_enddate']", $container).val(moment(visitED).format("DD-MM-YYYY"));
            $("[name='final_endtime']", $container).timepicker('setTime', moment($("#visit [name='endtime']", $eventModal).val(), "HH:mm a").format("LT"));
        }
        if (data) {
            $("[name='final_notes']", $container).val(data.final_notes);
            if (data.final_startdate) {
                $("[name='final_startdate']", $container).val(moment(data.final_startdate.date).format("DD-MM-YYYY"));
                $("#report [name='final_starttime']", $container).timepicker('setTime', moment(data.final_startdate.date).format("LTS"));
            }
            if (data.final_enddate) {
                $("[name='final_enddate']", $container).val(moment(data.final_enddate.date).format("DD-MM-YYYY"));
                $("[name='final_endtime']", $container).timepicker('setTime', moment(data.final_enddate.date).format("LTS"));
            }
            setSelectedProducts(data.products, $container);
            setSelectedContacts($container, data.contacts);
        }
    };
    
    var onDeleteMeetingNoteClick = function() {
        var $curMeetingNote = $(this).closest("div.tab-pane.active");
        var $tabLi = $("#report .meeting-notes .nav-tabs li > a[href='#" + $curMeetingNote.attr("id") + "']", $eventModal).parent();
        if ($tabLi.prev("li:visible").length > 0) {
            $tabLi.prev("li:visible").find("a").trigger("click");
        } else if ($tabLi.next("li:visible").length > 0) {
            $tabLi.next("li:visible").find("a").trigger("click");
        } else {
            $("#report .meeting-notes").removeClass("show").addClass("hidden");
        }
        $curMeetingNote.next(".clearfix").remove();
        $tabLi.add($curMeetingNote).remove();
        $("#report .meeting-notes > .nav-tabs > li:not(.emty-tab-li)", $eventModal).each(function(i) {
            var $cur = $(this);
            $("#report .meeting-notes " + $cur.find("a").attr("href"), $eventModal).attr("id", "meeting" + (i + 1));
            $cur.find("a").attr("href", "#meeting" + (i + 1)).text("Meeting Note " + (i + 1));
        });
    };
    $("#report .meeting-notes", $eventModal).on("click", ".delete-note", onDeleteMeetingNoteClick);

//    var parseProductData = function(res) {
//        if (res.STATUS !== 1 || !res.DATA.products) {
//            return;
//        }
//        var $option;
//        $("#report [name='product']", $eventModal).html("");
//        for (var i = 0; i < res.DATA.products.length; i++) {
//            $option = $("<option />").attr("value", res.DATA.products[i].id).text(res.DATA.products[i].name);
//            $("#report [name='product']", $eventModal).append($option);
//        }
//    };

    var onModalOpen = function(selectedDate, data, calData) {
        if (!selectedDate) {
            selectedDate = moment().format("DD-MM-YYYY");
        }
        $("#visit form", $eventModal)[0].reset();
        $("#report form", $eventModal)[0].reset();
        $("[href='#visit']", $eventModal).trigger("click");
        $("#visit .btn-group .dropdown-menu a[data-val='1']", $eventModal).trigger("click");
        
        //remove error on open
        $(".has-error",$eventModal).each(function(){
           $(this).removeClass("has-error");
        });

        $("#visit [name='contact'] > option", $eventModal).attr("value", "").text("").trigger('click');
        $("#visit [name='contact']", $eventModal).siblings(".select2.select2-container").find(".select2-selection__rendered").html('<span class="select2-selection__placeholder">Select Contact</span>');
        $("#visit [name='location'] > option", $eventModal).attr("value", "").text("").trigger('click');
        $("#visit [name='location']", $eventModal).siblings(".select2.select2-container").find(".select2-selection__rendered").html('<span class="select2-selection__placeholder">Select Location</span>');
        $("#visit [name='specialty'] > option", $eventModal).attr("value", "").text("").trigger('click');
        $("#visit [name='specialty']", $eventModal).siblings(".select2.select2-container").find(".select2-selection__rendered").html('<span class="select2-selection__placeholder">Select Specialty</span>');

//        $("#report [name='product'] > option", $eventModal).attr("value", "").text("").trigger('click');
//        $("#report [name='product']", $eventModal).siblings(".select2.select2-container").find(".select2-selection__rendered").html('<span class="select2-selection__placeholder">Select Product</span>');

        $("#visit [name='starttime']", $eventModal).timepicker('setTime', data ? moment(data.startdate.date).format("LT") : moment().format("LT"));
        $("#visit [name='endtime']", $eventModal).timepicker('setTime', data ? moment(data.enddate.date).format("LT") : moment().format("LT"));
        $("#visit .date", $eventModal).find("input").val(selectedDate);
        
        //reset report tab meeting notes
        $("#report .meeting-notes .nav-tabs li:not(.emty-tab-li.hidden)", $eventModal).remove();
        $("#report .meeting-notes .tab-pane:not(.empty-note-tab.hidden)", $eventModal).remove();
        $("#report .meeting-notes", $eventModal).removeClass("show").addClass("hidden");
        
//        setSelectedProducts([]);
        if (data) {// set pop data on edit
            $("#visit [name='title']", $eventModal).val(data.title);
            $("#visit [name='allday']", $eventModal).prop("checked", data.allDay && data.allDay == "1");
//            $("#visit [name='contact']", $eventModal).val(data.contact_ent_id);
            setSelectedContacts($("#visit", $eventModal), data.contacts);
//            $("#visit [name='contact'] > option", $eventModal).attr("value", data.contact_ent_id).text(data.contact_name).trigger('click');
//            $("#visit [name='contact']", $eventModal).siblings(".select2.select2-container").find(".select2-selection__rendered").text(data.contact_name);
//            $("#visit [name='location']", $eventModal).val(data.location_ent_id);
            $("#visit [name='location'] > option", $eventModal).attr("value", data.location_ent_id).text(data.location_name).trigger('click');
            $("#visit [name='location']", $eventModal).siblings(".select2.select2-container").find(".select2-selection__rendered").text(data.location_name);
            $("#visit [name='specialty'] > option", $eventModal).attr("value", data.specialty_id).text(data.specialty_name).trigger('click');
            $("#visit [name='specialty']", $eventModal).siblings(".select2.select2-container").find(".select2-selection__rendered").text(data.specialty_name);
            
            $("#visit [name='notes']", $eventModal).val(data.notes);
            $("#visit [name='startdate']", $eventModal).val(moment(data.startdate.date).format("DD-MM-YYYY"));
            $("#visit [name='enddate']", $eventModal).val(moment(data.enddate.date).format("DD-MM-YYYY"));
            $("#visit .btn-group .dropdown-menu a[data-val='" + data.state + "']", $eventModal).trigger("click");
            
            for (var i = 0; i < data["noteparam"].length; i++) {
                onAddNewNoteClick(data["noteparam"][i]);
            }
            
            $("#report > form [name='final_notes']", $eventModal).val(data.final_notes);
//            if (data.final_startdate) {
//                $("#report [name='final_startdate']", $eventModal).val(moment(data.final_startdate.date).format("DD-MM-YYYY"));
//                $("#report [name='final_starttime']", $eventModal).timepicker('setTime', moment(data.final_startdate.date).format("LTS"));
//            }
//            if (data.final_enddate) {
//                $("#report [name='final_enddate']", $eventModal).val(moment(data.final_enddate.date).format("DD-MM-YYYY"));
//                $("#report [name='final_endtime']", $eventModal).timepicker('setTime', moment(data.final_enddate.date).format("LTS"));
//            }
//            setSelectedProducts(data.products);
            $eventModal.data("visit_id", data.id);
        }
        $("#visit [name='allday']", $eventModal).trigger("change");
        if (calData) {
            if (calData.isSelectAllDay) {
                $("#visit [name='allday']", $eventModal).prop("checked", true).trigger("change");
                $("#visit [name='enddate']", $eventModal).val(calData.endTime.format("DD-MM-YYYY"));
            }
            if (calData.startTime) {
                $("#visit [name='starttime']", $eventModal).timepicker('setTime', calData.startTime.format("LTS"));
            }
            if (calData.endTime) {
                $("#visit [name='endtime']", $eventModal).timepicker('setTime', calData.endTime.format("LTS"));
            }
            if (calData.endDate) {
                $("#visit [name='enddate']", $eventModal).val(calData.endDate.format("DD-MM-YYYY"));
            }
        }
        $(".modal-header > h4", $eventModal).text(data ? "Update Event" : "Add Event");
        $eventModal.modal({
            backdrop: 'static',
            keyboard: false
        });
    };
    $("#add_new_visit").on("click", function() {
        onModalOpen($('#sandbox-container div').data('datepicker').getFormattedDate('dd-mm-yyyy'));
    });

    $("a[href='#report']", $eventModal).on('show.bs.tab', function(e) {
        if (!validateRequiredField($("#visit", $eventModal))) {
            e.preventDefault();
            return;
        }
    });

    $eventModal.on('hidden.bs.modal', function() {
        $eventModal.removeData("visit_id");
    });

    $("#visit [name='allday']", $eventModal).on("change", function() {
        $("#visit [name='starttime'],#visit [name='enddate'],#visit [name='endtime']", $eventModal).prop("disabled", $(this).prop("checked"))
    });

    var setSelectedProducts = function(prodList, $container) {
        if (!prodList || prodList.length === 0) {
            $("#product_container > tbody", $container).html('<tr><td colspan="3">No Products Added</td></tr>');
            return;
        }
        $("#product_container > tbody tr td[colspan]", $container).parent().remove();
        var i, $tr, $tdProduct, $tdNote, $tdAction;
        for (i = 0; i < prodList.length; i++) {
            $tr = $("<tr />");
            $tdProduct = $("<td />").text(prodList[i].name);
            $tdNote = $("<td />").html("<div class='form-group'><input class='form-control' placeholder='Enter Note' value='" + prodList[i].notes + "' /></div>");
            $tdAction = $("<td />").html('<span class="glyphicon glyphicon-trash remove_product" data-unicode="e020" style="color:red;margin:10px;cursor:pointer"></span>');
            $tr.append($tdProduct, $tdNote, $tdAction).attr("data-id", prodList[i].id);
            $("#product_container > tbody", $container).append($tr);
        }
        $("[name='product'] > option", $container).attr("value", "").text("").trigger('click');
        $("[name='product']", $container).siblings(".select2.select2-container").find(".select2-selection__rendered").html('<span class="select2-selection__placeholder">Select Product</span>');
        $("[name='product_note']", $container).val("");
    };
    
    var setSelectedContacts = function($container, contactList) {
        if(!contactList) {
            return;
        }
        $("[name='contact'] option:first", $container).nextAll().remove();
        for (var i = 0; i < contactList.length; i++) {
            $("[name='contact']", $container).append("<option selected='selected' value='" + contactList[i].id + "'>" + contactList[i].name + "</option>");
        }
        $("[name='contact']", $container).trigger("change");
    };

    $("#report", $eventModal).on("click", ".add_product", function(e) {// add product click
        var $form = $(this).closest("form").parent();
        if (!validateRequiredField($("[name='product']", $form).parent().parent())) {
            e.preventDefault();
            return;
        }
        var product = $("[name='product']", $form).val();
        var prodList = [{
                id: product,
                name: $("[name='product']", $form).siblings(".select2.select2-container").find(".select2-selection__rendered")[0].childNodes[1].textContent,
                notes: $("[name='product_note']", $form).val()
            }];
        setSelectedProducts(prodList, $form);
    });

    $("#report", $eventModal).on("click", "#product_container .remove_product", function() {//remove product click
        var $container = $(this).closest("form").parent();
        $(this).closest("tr").remove();
        if ($("#product_container tr[data-id]", $container).length === 0) {
            $("#product_container > tbody", $container).html('<tr><td colspan="3">No Products Added</td></tr>');
        }
    });

    var onEventSaveClick = function() {
        if (!validateRequiredField($("#visit", $eventModal))) {
            return;
        }
        var noteParam = [], selProd, tempObj, temp;
        $("#report .meeting-notes .tab-pane:not(.empty-note-tab)", $eventModal).each(function() {
            var $this = $(this);
            selProd = [], tempObj;
            $("#product_container tr[data-id]", $this).each(function() {
                tempObj = {};
                tempObj["id"] = $(this).attr("data-id");
                tempObj["notes"] = $(this).find("input").val();
                selProd.push(tempObj);
            });
            temp = getParamObj($this);
            temp["selectedproducts"] = selProd;
            noteParam.push(temp);
        });
        var param = getParamObj($("#visit", $eventModal));
//        param = $.extend(param, getParamObj($("#report", $eventModal)));
//        param["selectedproducts"] = JSON.stringify(selProd);
        param["final_notes"] = $("#report [name='final_notes']", $eventModal).val();
        param["noteparam"] = JSON.stringify(noteParam);
        param["id"] = $eventModal.data("visit_id") ? $eventModal.data("visit_id") : null;
        param["allday"] = $("#visit [name='allday']", $eventModal).is(":checked") ? 1 : 0;
        if (param["allday"] === 1) {
            param["starttime"] = "12:00:00 AM";
            param["endtime"] = "12:00:00 AM";
//            param["enddate"] = param["startdate"];
        }
        param["action"] = param["id"] ? "updatevisit" : "savevisit";
        var $btn = $(this);
        $btn.button('loading');
        jqueryAjax("calendarevents.php", param, function(res) {
            $btn.button("reset");
            if (res.STATUS != 1) {
                return;
            }
            var data = fillEventObj(res.DATA);
            if (param["id"]) {
                $('#calendar').fullCalendar('removeEvents', param["id"]);
            }
            $('#calendar').fullCalendar('addEventSource', [data]);
            $eventModal.modal("hide");
        });
    };
    $("#save_event", $eventModal).on("click", onEventSaveClick);

    $("#visit .btn-group .dropdown-menu a", $eventModal).click(function() {
        var $this = $(this);
        $("[data-state]", $eventModal).html($this.text() + " <span class='caret'></span>").css({"background-color": $this.attr("data-color"), "border-color": $this.attr("data-color")});
        $("[name='state']", $eventModal).val($this.attr("data-val"));
    });

    var changeEvent = function(event, delta, revertFunc) {
        var param = JSON.parse(JSON.stringify(event));
        param["starttime"] = event.start.format("LTS");
        param["endtime"] = event.end ? event.end.format("LTS") : param["starttime"];
        param["startdate"] = event.start.format("DD-MM-YYYY");
        param["enddate"] = event.end ? event.end.format("DD-MM-YYYY") : param["startdate"];
        
        for (var i = 0; i < event["noteparam"].length; i++) {
            if (event["noteparam"][i]["final_startdate"]) {
                event["noteparam"][i]["final_startdate"] = event["noteparam"][i]["final_startdate"] ? moment(event["noteparam"][i]["final_startdate"].date).format("DD-MM-YYYY") : "";
                event["noteparam"][i]["final_starttime"] = event["noteparam"][i]["final_startdate"] ? moment(event["noteparam"][i]["final_startdate"].date).format("LTS") : "";
            } else {
                event["noteparam"][i]["final_startdate"] = "";
                event["noteparam"][i]["final_starttime"] = "";
            }
            if (event["noteparam"][i]["final_enddate"]) {
                event["noteparam"][i]["final_enddate"] = event["noteparam"][i]["final_enddate"] ? moment(event["noteparam"][i]["final_enddate"].date).format("DD-MM-YYYY") : "";
                event["noteparam"][i]["final_endtime"] = event["noteparam"][i]["final_enddate"] ? moment(event["noteparam"][i]["final_enddate"].date).format("LTS") : "";
            } else {
                event["noteparam"][i]["final_enddate"] = "";
                event["noteparam"][i]["final_endtime"] = "";
            }
            event["contact"] = event["noteparam"][i]["contacts"].map(function(a) {
                return a.id;
            }).join(",");
            event["selectedproducts"] = event["noteparam"][i]["products"];
        }
//        param["selectedproducts"] = JSON.stringify(event["products"]);
        param["noteparam"] = JSON.stringify(event["noteparam"]);
        param["allday"] = event["allDay"] ? 1 : 0;
        param["contact"] = event["contacts"].map(function(a) {
            return a.id;
        }).join(",");
        param["location"] = event["location_ent_id"];
        param["specialty"] = event["specialty_id"];
        param["action"] = "movevisit";
        oLoadingDiv.show("Updating Visit Data");
        jqueryAjax("calendarevents.php", param, function(res) {
            oLoadingDiv.hide();
            if (res.STATUS != 1) {
                showMessagePop("Error", res.MESSAGE);
                revertFunc();
                return;
            }
            var data = fillEventObj(res.DATA);
            $('#calendar').fullCalendar('removeEvents', param["id"]);
            $('#calendar').fullCalendar('addEventSource', [data]);
        }, function() {
            revertFunc();
        });
    };

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'Title',
            right: 'month,agendaWeek,agendaDay'
        },
        buttonText: {
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day'
        },
        nextDayThreshold: "00:00:00",
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function(date, allDay) { // this function is called when something is dropped
            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');
            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);
            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            copiedEventObject.backgroundColor = $(this).css("background-color");
            copiedEventObject.borderColor = $(this).css("border-color");
            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
        },
        eventResize: function(event, delta, revertFunc) {
            changeEvent(event, delta, revertFunc);
        },
        eventDrop: function(event, delta, revertFunc) {
            changeEvent(event, delta, revertFunc);
        },
        eventRender: function(event, element) {
            var seen = [];
//            $(element).addTouch();
            $(element).popover({
                html: true,
                container: 'body',
                title: (event.title || '&nbsp;') + ' <a class="close" href="javascript:void(0)" onclick="hideToolTip(this)" style="margin-left:10px;margin-top:-2px;">&times;</a>',
                content: '<div class="">' + (event.allDay ? "All day visit on this day" : moment(event.startdate.date).format("LT") + ' To ' + moment(event.enddate.date).format("LT")) + '</div><div>\n\
                            <br/><button class="btn btn-danger delete" data-loading-text=\"<i class=\'glyphicon glyphicon-refresh gly-spin\'></i> Deleting\">Delete</button>\n\
                            <button class="btn btn-default pull-right edit">Edit</button>\n\
                        </div>',
                placement: function(context, source) {
                    var position = $(source).position();
                    if (position.left > 515) {
                        return "left";
                    }
                    if (position > 0 && position.left < 515) {
                        return "right";
                    }
                    if (position.top < 110) {
                        return "bottom";
                    }
                    return "top";
                }
            }).data("eventData", JSON.stringify(event, function(key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                val ? delete val.source : "";
                return val;
            })).on('shown.bs.popover', function(eventShown) {
                var eventData = $(eventShown.target).data("eventData");
                eventData = eventData ? JSON.parse(eventData) : {};
                var $popup = $('#' + $(eventShown.target).attr('aria-describedby'));
                $popup.find('button.delete').click(function(e) {
                    var $btn = $(this);
                    var param = {};
                    param["action"] = "deletevisit";
                    param["id"] = eventData.id;
                    $btn.button('loading');
                    jqueryAjax("calendarevents.php", param, function(res) {
                        $btn.button("reset");
                        if (res.STATUS != 1) {
                            return;
                        }
                        $popup.popover('hide');
                        $('#calendar').fullCalendar('removeEvents', eventData._id);
                    });
                });
                $popup.find('button.edit').click(function(e) {
                    onModalOpen(moment(eventData.start).format("DD-MM-YYYY"), eventData);
                    $popup.popover('hide');
                });
            });
        },
        dayClick: function(date, jsEvent, view) {
            var calData = {};
            calData["isSelectAllDay"] = view.name === "month" || !date.hasTime();
            calData["startTime"] = date;
            if (!date.hasTime()) {
                calData["endTime"] = moment(date).add(1, "days");
            } else {
                calData["endTime"] = moment(date).add(30, "minutes");
            }
            if (date.hours() === 23 && date.minutes() === 30) {
                calData["endDate"] = moment(date).add(1, "days");
            }
            onModalOpen(date.format("DD-MM-YYYY"), null, calData);
        },
        viewRender: function(view) {
            $(".popover[role='tooltip']:visible").find(".close").trigger("click");
        }
    });

    $("body").on('click', function(e) {
        $('[data-toggle="popover"],[data-original-title]').each(function() {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false  // fix for BS 3.3.6
            }
        });
    });
}

function hideToolTip(e) {
    $(e).closest(".popover[role='tooltip']").hide().remove();
}
