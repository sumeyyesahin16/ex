$(document).ready(function(){
    $("#minDate").focusin(function () {
        $(this).datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            autoclose: true,
            language: "tr",
            todayBtn: "linked"
        });
    });

    $("#maxDate").focusin(function () {
        $(this).datepicker({
            format: "yyyy-mm-dd",
            todayHighlight: true,
            autoclose: true,
            language: "tr",
            todayBtn: "linked"
        });
    });

    $(".tipped").on("click",function(){
        var minDate = $("#start_date").val();
        var maxDate = $("#end_date").val();
        var res= "";
        $("#start_date").focusin(function (){
            $(this).datepicker({
                format: "yyyy-mm-dd",
                todayHighlight: true,
                autoclose: true,
                language: "tr",
                todayBtn: "linked"
            });
        })
        $("#end_date").focusin(function (){
            $(this).datepicker({
                format: "yyyy-mm-dd",
                todayHighlight: true,
                autoclose: true,
                language: "tr",
                todayBtn: "linked"
            });
        })

        // Custom filtering function which will search data in column three between two values
        $.fn.dataTable.ext.search.push(
            function( settings, data, dataIndex ) {
                var start_date = minDate;
                var end_date = maxDate;
                var date = new Date(data[2]);

                if (
                    ( start_date === null && end_date === null ) ||
                    ( start_date === null && date <= end_date ) ||
                    ( start_date <= date   && end_date === null ) ||
                    ( start_date <= date   && date <= end_date )
                )
                {
                    return true;
                }
                return false;
            }
        );

        var datePicker=`
        <table>
        <thead>
            <th>
                <div class="input-group"> <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                <input class="form-control input-sm pltdate" id="start_date" placeholder="Ba??lang????..." type="text" autocomplete="off" required="" >
                </div>
            </th>
            <th>
                <i class="fa fa-minus"></i>
            </th>
            <th>
                <div class="input-group">
                    <input class="form-control input-sm pltdate" id="end_date" placeholder="Biti??..." type="text" autocomplete="off" required=""><span class="input-group-addon" style="margin-left: 0px"><i class="fa fa-calendar" ></i></span>
                </div>
            </th>
        </thead>
    </table>
    
        `;
        $("#date_picker").empty();
        $(datePicker).appendTo("#date_picker");

        var table=`
        
           <table class="table table-striped table-hover " id="tipped_table" style=" border-radius: 5px">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Kullan??c??</th>
                                <th>????k???? Tarihi</th>
                                <th>Sipari?? No</th>
                                <th>Tarih</th>
                                <th>Firma</th>
                                <th>Takip No</th>
                                <th>Durum</th>
                                <th>Tekrar</th>
                                <th>Tekrar Tarih</th>
                                <th>E-Ar??iv</th>
                                <th>Teslim Tarihi</th>
                                <th>EGTB</th>
                                <th>??lke</th>
                                <th>Tutar</th>
                                <th>Paket</th>
                                <th>Av. ??lkesi</th>
                                <th>Not</th>

                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Kullan??c??</th>
                                <th>????k???? Tarihi</th>
                                <th>Sipari?? No</th>
                                <th>Tarih</th>
                                <th>Firma</th>
                                <th>Takip No</th>
                                <th>Durum</th>
                                <th>Tekrar</th>
                                <th>Tekrar Tarih</th>
                                <th>E-Ar??iv</th>
                                <th>Teslim Tarihi</th>
                                <th>EGTB</th>
                                <th>??lke</th>
                                <th>Tutar</th>
                                <th>Paket</th>
                                <th>Av. ??lkesi</th>
                                <th>Not</th>
                            </tr>
                            </tfoot>
                            <tbody id="tipped_tbody">

                            </tbody>
                        </table>
        
        `;
        $("#my_div").empty();
        $(table).appendTo("#my_div");

            $.ajax({
                url: 'http://kargokontrol.modaselvim.net:4554/api/v1/ydKargo/isListe',
                type: "post",
                data: {
                    "token": "5cf9f7597d144ad4e47c61ff3d5031d1",
                    "startDate": "2022-08-30",
                    "endDate": "2022-09-30",
                    "type": [0, 1],
                    "cargo": "pts"
                },
                success: function (resp) {
                    res = resp;
                    console.log(res);
                    if (resp.status == 200) {

                        var appText = "";


                        list_data = resp.data;

                        for (i in resp.data) {
                            var obj = resp.data[i];

                            appText += `
                                    <tr id="row_${obj.id}">
                                        <td>${obj.id}</td>
                                        <td>${obj.username}</td>
                                        <td>${obj.tarih}</td>
                                        <td>${obj.TS}</td>
                                        <td>${obj.tarih}</td>
                                        <td>${obj.takipno}</td>
                                        <td>${obj.durum}</td>
                                        <td>${obj.tekrar}</td>
                                        <td>${obj.tarih}</td>
                                        <td>${obj.etgb}</td>
                                        <td>${obj.DeliveryCountry}</td>
                                        <td>${obj.OrderTotalPrice}</td>
                                        <td>${obj.post_packet}</td>
                                        <td>${obj.etgb}</td>
                                        <td>${obj.DeliveryCountry}</td>
                                        <td>${obj.OrderTotalPrice}</td>
                                        <td>${obj.post_packet}</td>
                                        <td>${obj.post_packet}</td>
                                    </tr>
                                `;

                        }
                        console.log(resp);
                        $("#tipped_tbody").empty();
                        $("#tipped_tbody").append(appText);

                        $("#tipped_table").DataTable({
                            scrollX:true,
                            language: {
                                "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Turkish.json",
                                "buttons": {
                                    "pageLength": {
                                        "_": "Sayfada %d kay??t g??ster",
                                        "-1": "T??m??n?? g??ster" // ?? This will not work in JS, right?
                                    },
                                    "selectAll": "T??m??n?? Se??",
                                    "selectNone": "T??m??n?? Kald??r"
                                },
                                "select": {
                                    "rows": {
                                        "_": "%d Sat??r se??ildi.",
                                        "0": "Se??mek i??in bir sat??ra t??klay??n.",
                                        "1": "1 Sat??r se??ildi."
                                    }

                                }
                            },
                            dom: "Bflrtip",
                            paging: true,
                            pageLength: 10,
                            select: true,
                            lengthMenu: [
                                [10, 25, 50, -1],
                                [10, 25, 50, "All"]
                            ],
                            order: [
                                [6, "asc"]
                            ],
                            buttons: [
                                {
                                    extend: 'excel' ,
                                    title: $("#start_date").val() + ' ile ' + $("#end_date").val() + ' aras??',
                                    text: '<i class="fa fa-file-excel-o" style="color:green"></i>&nbsp; EXCEL'
                                },
                            ],

                            initComplete: function () {
                                let filter_columns =[0,1,2,3,4,5,6];
                                this.api().columns(filter_columns).every(function () {
                                    var column = this;
                                    var select = $('<select><option value="">T??m??</option></select>').appendTo($(column.footer()).empty()).on('change', function () {
                                        var val = $.fn.dataTable.util.escapeRegex(
                                            $(this).val()
                                        );
                                        column
                                            .search(val ? '^' + val + '$' : '', true, false)
                                            .draw();
                                    });
                                    column.data().unique().sort().each(function (d, j) {
                                        select.append('<option value="' + d + '">' + d + '</option>')
                                    });
                                });
                            },
                            footerCallback: function(row, data, start, end, display) {
                                var api = this.api(),
                                    data;

                                // Remove the formatting to get integer data for summation
                                var intVal = function(i) {
                                    return typeof i === 'string' ?
                                        i.replace(/[\$,]/g, '') * 1 :
                                        typeof i === 'number' ?
                                            i : 0;
                                };
                                // Total over this page
                                pageTotal = api
                                    .column(7, {  search: 'applied', page: 'all' })
                                    .data()
                                    .reduce(function(a, b) { return intVal(a) + intVal(b); }, 0);

                                $(api.column(7).footer()).html( 'Toplam : ' + pageTotal );

                                // Update footer
                                //alert(toplam);
                            },


                        });



                    }
            }

        });
    });
});