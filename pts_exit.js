
// const node_url      = "http://node.modaselvim.net:4554/api/v1";
//const node_url = 'https://kargo.modaselvim.net:8484/api/v1';
var list_data = [];

$(".ptsExit").on("click", function() {

    var table =
        `<table class="table table-striped table-hover" id="pts_exit_table">
                    <thead>
                        <tr class="info">
                            <th>ID</th>
                            <th>Barkod No</th>
                            <th>Tarih</th>
                            <th>Firma</th>
                           
                        </tr>
                    </thead>
                    <tbody id ="pts_exit_tbody"></tbody>
                    <tfoot>
                        <tr class="info">
                            <th>ID</th>
                            <th>Barkod No</th>
                            <th>Tarih</th>
                            <th>Firma</th>
                        </tr>
                    </tfoot>
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
            if (resp.status == 200) {

                var appText = "";


                list_data = resp.data;

                for (i in resp.data) {
                    var obj = resp.data[i];

                    appText += `
                                    <tr id="row_${obj.id}">
                                        <td>${obj.id}</td>
                                        <td> ${obj.takipno}</td>
                                         <td>${obj.tarih}</td>
                                        <td>${obj.Cargo}</td>
                                    </tr>
                                `;

                }
                console.log(resp);
                $("#pts_exit_tbody").empty();
                $("#pts_exit_tbody").append(appText);



                table= $("#pts_exit_table").DataTable({
                    scrollX:true,
                    language: {
                        "url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Turkish.json",
                        "buttons": {
                            "pageLength": {
                                "_": "Sayfada %d kayıt göster",
                                "-1": "Tümünü göster" // « This will not work in JS, right?
                            },
                            "selectAll": "Tümünü Seç",
                            "selectNone": "Tümünü Kaldır"
                        },
                        "select": {
                            "rows": {
                                "_": "%d Satır seçildi.",
                                "0": "Seçmek için bir satıra tıklayın.",
                                "1": "1 Satır seçildi."
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
                            title: $("#start").val() + ' ile ' + $("#end").val() + ' arası',
                            text: '<i class="fa fa-file-excel-o" style="background-color:green"></i>&nbsp; EXCEL'
                        },
                    ],

                    initComplete: function () {
                        let filter_columns =[0,1,2,3,4,5,6];
                        this.api().columns(filter_columns).every(function () {
                            var column = this;
                            var select = $('<select><option value="">Tümü</option></select>').appendTo($(column.footer()).empty()).on('change', function () {
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



        },
    })



});
