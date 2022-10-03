$(document).ready(function(){

    $(".ptsHandle").on("click",function(){

        var mtable=`
        
           <table class="table table-striped table-hover " id="pts_handle_table" style=" border-radius: 5px">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Kullanıcı</th>
                                <th>Çıkış Tarihi</th>
                                <th>Sipariş No</th>
                                <th>Tarih</th>
                                <th>Firma</th>
                                <th>Takip No</th>
                                <th>Durum</th>
                                <th>Tekrar</th>
                                <th>Tekrar Tarih</th>
                                <th>E-Arşiv</th>
                                <th>Teslim Tarihi</th>
                                <th>EGTB</th>
                                <th>Ülke</th>
                                <th>Tutar</th>
                                <th>Paket</th>
                                <th>Av. Ülkesi</th>
                                <th>Not</th>

                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Kullanıcı</th>
                                <th>Çıkış Tarihi</th>
                                <th>Sipariş No</th>
                                <th>Tarih</th>
                                <th>Firma</th>
                                <th>Takip No</th>
                                <th>Durum</th>
                                <th>Tekrar</th>
                                <th>Tekrar Tarih</th>
                                <th>E-Arşiv</th>
                                <th>Teslim Tarihi</th>
                                <th>EGTB</th>
                                <th>Ülke</th>
                                <th>Tutar</th>
                                <th>Paket</th>
                                <th>Av. Ülkesi</th>
                                <th>Not</th>
                            </tr>
                            </tfoot>
                            <tbody id="pts_handle_tbody">

                            </tbody>
                        </table>
        
        `;
        $("#my_div").empty();
        $(mtable).appendTo("#my_div");

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
                if (resp.status == 200) {

                    var appText = "";

                    list_data = resp.data;

                    for (i in resp.data) {
                        var obj = resp.data[i];

                            appText += `
                                    <tr id="row_${obj.id}">
                                        <td>${obj.id}</td>
                                        <td id="user">${obj.username}</td>
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
                console.log(obj.user_id);

                    }

                    console.log(resp);
                    $("#pts_handle_tbody").empty();
                    $("#pts_handle_tbody").append(appText);
                    if(obj.username !== "rafiye.can" )
                    {
                        $('#user').css('background-color', '#FF0070');
                    }
                    else if(obj.username !== "seval.tepecik"){
                        $('#user').css('background-color', '#aF8b00');
                    }
                    else  if(obj.username !== "kezban.ozel"){
                        $('#user').css('background-color' , '#Fc8610');
                    }
                    else  if(obj.username !== "mirackubra.keles"){
                        $('#user').css('background-color' , '#Fc8610');
                    }
                    else  if(obj.username !== "cevriye.berber"){
                        $('#user').css('background-color' , '#Fc8610');
                    }
                    else{}

                    mtable= $("#pts_handle_table").DataTable({
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
                                text: '<i class="fa fa-file-excel-o" style="color:green"></i>&nbsp; EXCEL'
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
            }

        });
    });
});