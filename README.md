# COLLAPSE PUREJS

## HƯỚNG DẪN SỬ DỤNG

Plugin chỉ cần chèn js vào trang và thêm `class`, `data-target` vào Title là hoạt động được.

+ Thêm class `.collapse-toggle` vào Title.
+ Thêm thuộc tính `data-target=` vào Title chỏ tới đối tượng cần collapse.
+ Các thuộc tính bổ sung trên Title
  
  ``` html
  <!-- Thời gian toggle -->
  <h2 class="collapse-toggle" data-duration="1000"></h2>
  
  <!-- Hiển thị nội dung toggle lúc ban đầu -->
  <h2 class="collapse-toggle" data-actived="true"></h2>
  ```
