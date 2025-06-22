# from django.contrib import admin
# from .models import (
#     Company, UserProfile, Employee, Organization, 
#     Doctor, Product, Visit, Attendance, Schedule, LeaveRequest
# )

# @admin.register(Company)
# class CompanyAdmin(admin.ModelAdmin):
#     list_display = ['name', 'email', 'phone', 'created_at']
#     search_fields = ['name', 'email']

# @admin.register(UserProfile)
# class UserProfileAdmin(admin.ModelAdmin):
#     list_display = ['user', 'role', 'company', 'phone']
#     list_filter = ['role']

# @admin.register(Employee)
# class EmployeeAdmin(admin.ModelAdmin):
#     list_display = ['user', 'employee_id', 'designation', 'company', 'is_active']
#     list_filter = ['company', 'is_active', 'designation']
#     search_fields = ['user__first_name', 'user__last_name', 'employee_id']

# @admin.register(Organization)
# class OrganizationAdmin(admin.ModelAdmin):
#     list_display = ['name', 'type', 'phone', 'company', 'created_at']
#     list_filter = ['type', 'company']
#     search_fields = ['name']

# @admin.register(Doctor)
# class DoctorAdmin(admin.ModelAdmin):
#     list_display = ['name', 'specialization', 'organization', 'phone', 'created_at']
#     list_filter = ['specialization', 'organization']
#     search_fields = ['name', 'specialization']

# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     list_display = ['name', 'category', 'price', 'company', 'is_active', 'created_at']
#     list_filter = ['category', 'company', 'is_active']
#     search_fields = ['name', 'category']

# @admin.register(Visit)
# class VisitAdmin(admin.ModelAdmin):
#     list_display = ['employee', 'doctor', 'organization', 'visit_date', 'status', 'created_at']
#     list_filter = ['status', 'visit_date', 'organization']
#     search_fields = ['employee__user__first_name', 'doctor__name', 'organization__name']

# @admin.register(Attendance)
# class AttendanceAdmin(admin.ModelAdmin):
#     list_display = ['employee', 'date', 'status', 'check_in', 'check_out']
#     list_filter = ['status', 'date']
#     search_fields = ['employee__user__first_name', 'employee__user__last_name']

# @admin.register(LeaveRequest)
# class LeaveRequestAdmin(admin.ModelAdmin):
#     list_display = ['employee', 'leave_type', 'start_date', 'end_date', 'status', 'applied_date']
#     list_filter = ['leave_type', 'status', 'applied_date']
#     search_fields = ['employee__user__first_name', 'employee__user__last_name']

# @admin.register(Schedule)
# class ScheduleAdmin(admin.ModelAdmin):
#     list_display = ['employee', 'title', 'date', 'time', 'type', 'status']
#     list_filter = ['type', 'status', 'date']
#     search_fields = ['title', 'employee__user__first_name']


from django.contrib import admin
from .models import (
    Company, UserProfile, Employee, Organization,
    Doctor, Product, Visit, Attendance, Schedule, LeaveRequest
)

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email', 'created_at']
    search_fields = ['name', 'email']
    list_filter = ['created_at']

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role', 'company', 'phone']
    search_fields = ['user__username', 'user__email']
    list_filter = ['role', 'company']

@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['user', 'employee_id', 'designation', 'company', 'is_active']
    search_fields = ['user__first_name', 'user__last_name', 'employee_id']
    list_filter = ['company', 'is_active']

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'company', 'phone', 'created_at']
    search_fields = ['name', 'address', 'email']
    list_filter = ['type', 'company']
    filter_horizontal = ['doctors']

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ['name', 'specialization', 'phone', 'get_organizations']
    search_fields = ['name', 'specialization']
    list_filter = ['specialization']

    def get_organizations(self, obj):
        return ", ".join([org.name for org in obj.organizations.all()])
    get_organizations.short_description = 'Organizations'

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'company', 'is_active']
    search_fields = ['name', 'category']
    list_filter = ['company', 'is_active']

@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    list_display = ['employee', 'doctor', 'organization', 'visit_date', 'status']
    search_fields = ['employee__user__first_name', 'doctor__name', 'organization__name']
    list_filter = ['status', 'visit_date']

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ['employee', 'date', 'status', 'check_in', 'check_out']
    search_fields = ['employee__user__first_name']
    list_filter = ['status']

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ['employee', 'title', 'type', 'status', 'date', 'time', 'created_at']
    search_fields = ['title', 'employee__user__first_name']
    list_filter = ['type', 'status', 'date']

@admin.register(LeaveRequest)
class LeaveRequestAdmin(admin.ModelAdmin):
    list_display = ['employee', 'leave_type', 'start_date', 'end_date', 'status']
    search_fields = ['employee__user__first_name', 'reason']
    list_filter = ['leave_type', 'status', 'start_date']