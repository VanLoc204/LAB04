let url = location.host;//so it works locally and online

$("table").rtResponsiveTables();//for the responsive tables plugin

$("#add_drug").submit(function(event){//on a submit event on the element with id add_drug
    alert($("#name").val() + " sent successfully!");//alert this in the browser
})



$("#update_drug").submit(function(event){// Sự kiện submit form cập nhật thuốc
    event.preventDefault();// Ngăn hành vi submit mặc định

    //var unindexed_array = $("#update_drug");
    var unindexed_array = $(this).serializeArray();// Lấy dữ liệu từ form
    var data = {}

    $.map(unindexed_array, function(n, i){// Gán key và value từ dữ liệu form
        data[n['name']] = n['value']
    })


    var request = {// Sử dụng PUT request để cập nhật dữ liệu trong database
    "url" : `/api/drugs/${data.id}`,
    "method" : "PUT",
    "data" : data
}

$.ajax(request).done(function(response){
    alert(data.name + " Updated Successfully!");// Hiển thị thông báo cập nhật thành công
		window.location.href = "/manage";// Chuyển hướng về trang manage sau khi đóng alert
    })

})

if(window.location.pathname == "/manage"){// Kiểm tra nếu đang ở trang manage để xử lý xóa thuốc
    $ondelete = $("table tbody td a.delete"); // Chọn các liên kết có class delete
    $ondelete.click(function(){// Thêm sự kiện click cho nút xóa
        let id = $(this).attr("data-id") // Lấy ID của thuốc từ data-id

        let request = {// Lưu yêu cầu API xóa
            "url" : `/api/drugs/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this drug?")){// Hiển thị hộp xác nhận
            $.ajax(request).done(function(response){// Nếu xác nhận, gửi yêu cầu API
                alert("Drug deleted Successfully!");// Hiển thị thông báo thành công
                location.reload();// Tải lại trang
            })
        }

    })
}

