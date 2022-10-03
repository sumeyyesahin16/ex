
// const node_url      = "http://node.modaselvim.net:4554/api/v1";
//const node_url = 'https://kargo.modaselvim.net:8484/api/v1';
var list_data = [];

$(".ptsGeneralHandle").on("click", function() {

    var mtable =
        `<table class="table table-striped table-hover" id="pts_general_table">
                    <thead>
                        <tr class="info">
                             <th>ID</th>
                            <th>Sipariş No</th>
                            <th>Tarih</th>
                            <th>Takip No</th>
                            <th>Yazdır</th>
                            <th>Kargo</th>
                            <th>Tekrar</th>
                            <th>Ülke</th>
                            <th>Müşteri</th>
                            <th>Tutar</th>
                            <th>Tsoft</th>
                            <th>Not</th>
                            <th>Av. Ülkesi</th>
                        </tr>
                    </thead>
                    <tbody id ="general_tbody"></tbody>
                    <tfoot>
                        <tr class="info">
                            <th>ID</th>
                            <th>Sipariş No</th>
                            <th>Tarih</th>
                            <th>Takip No</th>
                            <th>Yazdır</th>
                            <th>Kargo</th>
                            <th>Tekrar</th>
                            <th>Ülke</th>
                            <th>Müşteri</th>
                            <th>Tutar</th>
                            <th>Tsoft</th>
                            <th>Not</th>
                            <th>Av. Ülkesi</th>
                        </tr>
                    </tfoot>
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
                res = resp;
                if (resp.status == 200) {

                    var appText = "";


                    list_data = resp.data;

                    for (i in resp.data) {
                        var obj = resp.data[i];

                        appText += `
                                    <tr id="row_${obj.id}">
                                        <td>${obj.id}</td>
                                        <td>${obj.username}</td>
                                        <td>${obj.TS}</td>
                                        <td>${obj.tarih}</td>
                                        <td> 
                                            <table id='input'>
                                                <tbody>
                                               <tr>
                                               <td><input class="tsmi" type="text" style='width: 200px ;height: 30px;border-radius: 5px' name="takip" value="${obj.takipno}"  required>
                                                <select size="1" id="row-1-office" class="firma" name="firma" style='width: 90px;border-radius: 5px'>
                                                <option value="Edinburgh" selected="selected" class="Cargo">KARGO</option>
                                                <option value="pts">PTS</option>
                                                <option value="dhl">DHL</option>
                                                <option value="ptt">PTT</option>
                                                <option value="ups">UPS</option>
                                                </select>
    
                                                <select size="1" id="row-1-office" name="row-1-office" style='width: 90px;border-radius: 5px'>
                                                <option value="Edinburgh" selected="selected">İHRACAT</option>
                                                <option value="ihracat">İhracat</option>
                                                <option value="ihracatDegil">Değil</option>
                                                </select>
    
                                              <select size="1" id="row-1-office" name="post_packet" style='width: 90px;border-radius: 5px' class="post_packet">
                                                <option value="Edinburgh" selected="selected">PAKET</option>
                                                <option value="">Poşet</option>
                                                <option value=" ">KOLİ</option>
                                                <option value=" ">KOLİ 4</option>
                                                <option value=" ">KOLİ 5</option>
                                                <option value=" ">KOLİ 6</option>
                                                <option value=" ">KOLİ 7</option>
                                                <option value=" ">KOLİ 8</option>
                                                </select>
                                                  <input type="submit" onclick="$.handled();" class="handled" name="degis" value="İşlendi" style='background-color: #a80055;color: white;border-style: none;border-radius: 5px'>
                                                </td>
                                                </tr>
                                                </table>
                                        </td>
                                        <td>${obj.BarcodeUrl}</td>
                                         <td>${obj.durum}</td>
                                        <td>${obj.tekrar}</td>
                                        <td>${obj.TS}</td>
                                        <td>${obj.tarih}</td>
                                        <td>${obj.takipno}</td>
                                         <td>${obj.tarih}</td>
                                        <td>${obj.takipno}</td>
                                    </tr>
                                `;

                    }
                    console.log(resp);
                    $("#general_tbody").empty();
                    $("#general_tbody").append(appText);



                mtable= $("#pts_general_table").DataTable({
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

                    $('#startDate, #endDate').on('change', function () {
                        mtable.draw();
                    });


                }
                else {
                    alert(kayityol)
                }

              //  error : function (xhr) {alert(xhr.responseText);}
            },
        })



});






