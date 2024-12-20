-- Tìm kiếm nhân viên
IF OBJECT_ID('sp_TimKiemNhanVien', 'P') IS NOT NULL
    DROP PROCEDURE sp_TimKiemNhanVien;
GO

CREATE PROCEDURE sp_TimKiemNhanVien
    @query NVARCHAR(255),
    @maChiNhanh NVARCHAR(50)
AS
BEGIN
    SELECT NV.*, CN.TenChiNhanh
    FROM NHAN_VIEN NV
    JOIN BO_PHAN BP ON NV.MaBoPhan = BP.MaBoPhan
    JOIN CHI_NHANH CN ON NV.MaChiNhanh = CN.MaChiNhanh
    WHERE (NV.HoTen LIKE '%' + @query + '%' OR NV.MaNV LIKE '%' + @query + '%')
        AND (CN.MaChiNhanh = @maChiNhanh OR @maChiNhanh = 'all')

END;
GO