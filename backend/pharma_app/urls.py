# # # # from django.urls import path
# # # # from . import views

# # # # urlpatterns = [
# # # #     # Authentication
# # # #     path('auth/login/', views.login_view, name='login'),
# # # #     path('auth/signup/', views.signup_view, name='signup'),
    
# # # #     # Dashboard
# # # #     path('dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
    
# # # #     # Companies
# # # #     path('companies/', views.CompanyListCreateView.as_view(), name='company-list'),
    
# # # #     # Employees
# # # #     path('employees/', views.EmployeeListCreateView.as_view(), name='employee-list'),
# # # #     path('employees/create/', views.create_employee, name='create-employee'),
# # # #     path('employees/<int:employee_id>/visits/', views.employee_visits, name='employee-visits'),
    
# # # #     # Organizations
# # # #     path('organizations/', views.OrganizationListCreateView.as_view(), name='organization-list'),
# # # #     path('organizations/<int:pk>/', views.OrganizationDetailView.as_view(), name='organization-detail'),
    
# # # #     # Doctors
# # # #     path('doctors/', views.DoctorListCreateView.as_view(), name='doctor-list'),
# # # #     path('doctors/<int:pk>/', views.DoctorDetailView.as_view(), name='doctor-detail'),
    
# # # #     # Products
# # # #     path('products/', views.ProductListCreateView.as_view(), name='product-list'),
# # # #     path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    
# # # #     # Visits
# # # #     path('visits/', views.VisitListCreateView.as_view(), name='visit-list'),
# # # #     path('visits/<int:pk>/', views.VisitDetailView.as_view(), name='visit-detail'),
    
# # # #     # Attendance
# # # #     path('attendance/', views.AttendanceListCreateView.as_view(), name='attendance-list'),
# # # #     path('attendance/mark/', views.mark_attendance, name='mark-attendance'),
    
# # # #     # Leave Requests
# # # #     path('leaves/', views.LeaveRequestListCreateView.as_view(), name='leave-list'),
# # # #     path('leaves/<int:leave_id>/approve/', views.approve_leave, name='approve-leave'),
    
# # # #     # Schedules
# # # #     path('schedules/', views.ScheduleListCreateView.as_view(), name='schedule-list'),
# # # #     path('schedules/<int:pk>/', views.ScheduleDetailView.as_view(), name='schedule-detail'),
# # # # ]

# # # from django.urls import path
# # # from . import views

# # # urlpatterns = [
# # #     # Authentication
# # #     path('auth/login/', views.login_view, name='login'),
# # #     path('auth/signup/', views.signup_view, name='signup'),
# # #     path('auth/profile/', views.get_user_profile, name='user-profile'),
    
# # #     # Dashboard
# # #     path('dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
    
# # #     # Companies
# # #     path('companies/', views.CompanyListCreateView.as_view(), name='company-list'),
    
# # #     # Employees
# # #     path('employees/', views.EmployeeListCreateView.as_view(), name='employee-list'),
# # #     path('employees/create/', views.create_employee, name='employee-create'),
# # #     path('employees/<int:employee_id>/visits/', views.employee_visits, name='employee-visits'),
    
# # #     # Organizations
# # #     path('organizations/', views.OrganizationListCreateView.as_view(), name='organization-list'),
# # #     path('organizations/<int:pk>/', views.OrganizationDetailView.as_view(), name='organization-detail'),
    
# # #     # Doctors
# # #     path('doctors/', views.DoctorListCreateView.as_view(), name='doctor-list'),
# # #     path('doctors/<int:pk>/', views.DoctorDetailView.as_view(), name='doctor-detail'),
    
# # #     # Products
# # #     path('products/', views.ProductListCreateView.as_view(), name='product-list'),
# # #     path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    
# # #     # Visits
# # #     path('visits/', views.VisitListCreateView.as_view(), name='visit-list'),
# # #     path('visits/<int:pk>/', views.VisitDetailView.as_view(), name='visit-detail'),
    
# # #     # Attendance
# # #     path('attendance/', views.AttendanceListCreateView.as_view(), name='attendance-list'),
# # #     path('attendance/mark/', views.mark_attendance, name='mark-attendance'),
    
# # #     # Leave Requests
# # #     path('leaves/', views.LeaveRequestListCreateView.as_view(), name='leave-list'),
# # #     path('leaves/<int:leave_id>/approve/', views.approve_leave, name='approve-leave'),
    
# # #     # Schedules
# # #     path('schedules/', views.ScheduleListCreateView.as_view(), name='schedule-list'),
# # #     path('schedules/<int:pk>/', views.ScheduleDetailView.as_view(), name='schedule-detail'),
# # # ]

# # # your_app/urls.py
# # from django.urls import path
# # from . import views

# # urlpatterns = [
# #     # Authentication
# #     path('auth/login/', views.login_view, name='login'),
# #     path('auth/signup/', views.signup_view, name='signup'),
# #     path('auth/profile/', views.get_user_profile, name='user-profile'),
    
# #     # Dashboard
# #     path('dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
    
# #     # Companies
# #     path('companies/', views.CompanyListCreateView.as_view(), name='company-list'),
    
# #     # Employees
# #     path('employees/', views.EmployeeListCreateView.as_view(), name='employee-list'),
# #     path('employees/create/', views.create_employee, name='employee-create'),
# #     path('employees/<int:employee_id>/visits/', views.employee_visits, name='employee-visits'),
    
# #     # Organizations
# #     path('organizations/', views.OrganizationListCreateView.as_view(), name='organization-list'),
# #     path('organizations/<int:pk>/', views.OrganizationDetailView.as_view(), name='organization-detail'),
    
# #     # Doctors
# #     path('doctors/', views.DoctorListCreateView.as_view(), name='doctor-list'),
# #     path('doctors/<int:pk>/', views.DoctorDetailView.as_view(), name='doctor-detail'),
    
# #     # Products
# #     path('products/', views.ProductListCreateView.as_view(), name='product-list'),
# #     path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    
# #     # Visits
# #     path('visits/', views.VisitListCreateView.as_view(), name='visit-list'),
# #     path('visits/<int:pk>/', views.VisitDetailView.as_view(), name='visit-detail'),
    
# #     # Attendance
# #     path('attendance/', views.AttendanceListCreateView.as_view(), name='attendance-list'),
# #     path('attendance/mark/', views.mark_attendance, name='mark-attendance'),
    
# #     # Leave Requests
# #     path('leaves/', views.LeaveRequestListCreateView.as_view(), name='leave-list'),
# #     path('leaves/<int:leave_id>/approve/', views.approve_leave, name='approve-leave'),
    
# #     # Schedules
# #     path('schedules/', views.ScheduleListCreateView.as_view(), name='schedule-list'),
# #     path('schedules/<int:pk>/', views.ScheduleDetailView.as_view(), name='schedule-detail'),
# # ]


# from django.urls import path
# from . import views

# urlpatterns = [
#     # Authentication
#     path('auth/login/', views.login_view, name='login'),
#     path('auth/signup/', views.signup_view, name='signup'),
#     path('auth/profile/', views.get_user_profile, name='user-profile'),
    
#     # Dashboard
#     path('dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
    
#     # Companies
#     path('companies/', views.CompanyListCreateView.as_view(), name='company-list'),
    
#     # Employees
#     path('employees/', views.EmployeeListCreateView.as_view(), name='employee-list'),
#     path('employees/create/', views.create_employee, name='employee-create'),
#     path('employees/<int:employee_id>/visits/', views.employee_visits, name='employee-visits'),
    
#     # Organizations
#     path('organizations/', views.OrganizationListCreateView.as_view(), name='organization-list'),
#     path('organizations/<int:pk>/', views.OrganizationDetailView.as_view(), name='organization-detail'),
    
#     # Doctors
#     path('doctors/', views.DoctorListCreateView.as_view(), name='doctor-list'),
#     path('doctors/<int:pk>/', views.DoctorDetailView.as_view(), name='doctor-detail'),
    
#     # Products
#     path('products/', views.ProductListCreateView.as_view(), name='product-list'),
#     path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    
#     # Visits
#     path('visits/', views.VisitListCreateView.as_view(), name='visit-list'),
#     path('visits/<int:pk>/', views.VisitDetailView.as_view(), name='visit-detail'),
    
#     # Attendance
#     path('attendance/', views.AttendanceListCreateView.as_view(), name='attendance-list'),
#     path('attendance/mark/', views.mark_attendance, name='mark-attendance'),
    
#     # Leave Requests
#     path('leaves/', views.LeaveRequestListCreateView.as_view(), name='leave-list'),
#     path('leaves/<int:leave_id>/approve/', views.approve_leave, name='approve-leave'),
    
#     # Schedules
#     path('schedules/', views.ScheduleListCreateView.as_view(), name='schedule-list'),
#     path('schedules/<int:pk>/', views.ScheduleDetailView.as_view(), name='schedule-detail'),
# ]

from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('auth/login/', views.login_view, name='login'),
    path('auth/signup/', views.signup_view, name='signup'),
    path('auth/profile/', views.get_user_profile, name='user-profile'),
    
    # Dashboard
    path('dashboard/stats/', views.dashboard_stats, name='dashboard-stats'),
    
    # Companies
    path('companies/', views.CompanyListCreateView.as_view(), name='company-list'),
    
    # Employees
    path('employees/', views.EmployeeListCreateView.as_view(), name='employee-list'),
    path('employees/create/', views.create_employee, name='employee-create'),
    path('employees/<int:employee_id>/visits/', views.employee_visits, name='employee-visits'),
    
    # Organizations
    path('organizations/', views.OrganizationListCreateView.as_view(), name='organization-list'),
    path('organizations/<int:pk>/', views.OrganizationDetailView.as_view(), name='organization-detail'),
    
    # Doctors
    path('doctors/', views.DoctorListCreateView.as_view(), name='doctor-list'),
    path('doctors/<int:pk>/', views.DoctorDetailView.as_view(), name='doctor-detail'),
    
    # Products
    path('products/', views.ProductListCreateView.as_view(), name='product-list'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),
    
    # Visits
    path('visits/', views.VisitListCreateView.as_view(), name='visit-list'),
    path('visits/<int:pk>/', views.VisitDetailView.as_view(), name='visit-detail'),
    
    # Attendance
    path('attendance/', views.AttendanceListCreateView.as_view(), name='attendance-list'),
    path('attendance/mark/', views.mark_attendance, name='mark-attendance'),
    
    # Leave Requests
    path('leaves/', views.LeaveRequestListCreateView.as_view(), name='leave-list'),
    path('leaves/<int:leave_id>/approve/', views.approve_leave, name='approve-leave'),
    
    # Schedules
    path('schedules/', views.ScheduleListCreateView.as_view(), name='schedule-list'),
    path('schedules/<int:pk>/', views.ScheduleDetailView.as_view(), name='schedule-detail'),
]