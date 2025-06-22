# # # # # from django.db import models
# # # # # from django.contrib.auth.models import User
# # # # # from django.utils import timezone
# # # # # from datetime import date

# # # # # class Company(models.Model):
# # # # #     name = models.CharField(max_length=200)
# # # # #     address = models.TextField()
# # # # #     phone = models.CharField(max_length=20)
# # # # #     email = models.EmailField()
# # # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # # #     def __str__(self):
# # # # #         return self.name
    
# # # # #     class Meta:
# # # # #         verbose_name_plural = "Companies"

# # # # # class UserProfile(models.Model):
# # # # #     ROLE_CHOICES = [
# # # # #         ('employee', 'Employee'),
# # # # #         ('owner', 'Company Owner'),
# # # # #     ]
    
# # # # #     user = models.OneToOneField(User, on_delete=models.CASCADE)
# # # # #     role = models.CharField(max_length=10, choices=ROLE_CHOICES)
# # # # #     company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
# # # # #     phone = models.CharField(max_length=20, blank=True)
    
# # # # #     def __str__(self):
# # # # #         return f"{self.user.username} - {self.role}"

# # # # # class Employee(models.Model):
# # # # #     user = models.OneToOneField(User, on_delete=models.CASCADE)
# # # # #     employee_id = models.CharField(max_length=20, unique=True)
# # # # #     phone = models.CharField(max_length=20)
# # # # #     designation = models.CharField(max_length=100)
# # # # #     joining_date = models.DateField()
# # # # #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# # # # #     is_active = models.BooleanField(default=True)
    
# # # # #     def __str__(self):
# # # # #         return f"{self.user.first_name} {self.user.last_name} - {self.employee_id}"

# # # # # class Organization(models.Model):
# # # # #     ORGANIZATION_TYPES = [
# # # # #         ('hospital', 'Hospital'),
# # # # #         ('clinic', 'Clinic'),
# # # # #         ('pharmacy', 'Pharmacy'),
# # # # #         ('laboratory', 'Laboratory'),
# # # # #         ('other', 'Other'),
# # # # #     ]
    
# # # # #     name = models.CharField(max_length=200)
# # # # #     address = models.TextField()
# # # # #     phone = models.CharField(max_length=20)
# # # # #     email = models.EmailField(blank=True)
# # # # #     type = models.CharField(max_length=20, choices=ORGANIZATION_TYPES)
# # # # #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# # # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # # #     def __str__(self):
# # # # #         return self.name

# # # # # class Doctor(models.Model):
# # # # #     name = models.CharField(max_length=200)
# # # # #     specialization = models.CharField(max_length=100)
# # # # #     phone = models.CharField(max_length=20)
# # # # #     email = models.EmailField(blank=True)
# # # # #     organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
# # # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # # #     def __str__(self):
# # # # #         return f"Dr. {self.name} - {self.specialization}"

# # # # # class Product(models.Model):
# # # # #     name = models.CharField(max_length=200)
# # # # #     description = models.TextField()
# # # # #     category = models.CharField(max_length=100)
# # # # #     price = models.DecimalField(max_digits=10, decimal_places=2)
# # # # #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# # # # #     is_active = models.BooleanField(default=True)
# # # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # # #     def __str__(self):
# # # # #         return self.name

# # # # # class Visit(models.Model):
# # # # #     STATUS_CHOICES = [
# # # # #         ('scheduled', 'Scheduled'),
# # # # #         ('ongoing', 'Ongoing'),
# # # # #         ('completed', 'Completed'),
# # # # #         ('cancelled', 'Cancelled'),
# # # # #     ]
    
# # # # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # # # #     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
# # # # #     organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
# # # # #     products = models.ManyToManyField(Product, blank=True)
# # # # #     visit_date = models.DateField()
# # # # #     visit_time = models.TimeField()
# # # # #     duration = models.IntegerField(help_text="Duration in minutes", default=30)
# # # # #     notes = models.TextField(blank=True)
# # # # #     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
# # # # #     created_at = models.DateTimeField(auto_now_add=True)
# # # # #     updated_at = models.DateTimeField(auto_now=True)
    
# # # # #     def __str__(self):
# # # # #         return f"{self.employee.user.first_name} visits Dr. {self.doctor.name} on {self.visit_date}"
    
# # # # #     class Meta:
# # # # #         ordering = ['-visit_date', '-visit_time']

# # # # # class Attendance(models.Model):
# # # # #     STATUS_CHOICES = [
# # # # #         ('present', 'Present'),
# # # # #         ('absent', 'Absent'),
# # # # #         ('partial', 'Partial'),
# # # # #         ('leave', 'On Leave'),
# # # # #     ]
    
# # # # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # # # #     date = models.DateField()
# # # # #     check_in = models.TimeField(null=True, blank=True)
# # # # #     check_out = models.TimeField(null=True, blank=True)
# # # # #     status = models.CharField(max_length=10, choices=STATUS_CHOICES)
# # # # #     notes = models.TextField(blank=True)
# # # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # # #     def __str__(self):
# # # # #         return f"{self.employee.user.first_name} - {self.date} - {self.status}"
    
# # # # #     class Meta:
# # # # #         unique_together = ['employee', 'date']
# # # # #         ordering = ['-date']

# # # # # class LeaveRequest(models.Model):
# # # # #     LEAVE_TYPES = [
# # # # #         ('sick', 'Sick Leave'),
# # # # #         ('casual', 'Casual Leave'),
# # # # #         ('vacation', 'Vacation'),
# # # # #         ('emergency', 'Emergency Leave'),
# # # # #         ('other', 'Other'),
# # # # #     ]
    
# # # # #     STATUS_CHOICES = [
# # # # #         ('pending', 'Pending'),
# # # # #         ('approved', 'Approved'),
# # # # #         ('rejected', 'Rejected'),
# # # # #     ]
    
# # # # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # # # #     leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
# # # # #     start_date = models.DateField()
# # # # #     end_date = models.DateField()
# # # # #     reason = models.TextField()
# # # # #     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
# # # # #     applied_date = models.DateTimeField(auto_now_add=True)
# # # # #     approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_leaves')
# # # # #     approved_date = models.DateTimeField(null=True, blank=True)
# # # # #     comments = models.TextField(blank=True)
    
# # # # #     def __str__(self):
# # # # #         return f"{self.employee.user.first_name} - {self.leave_type} - {self.start_date} to {self.end_date}"
    
# # # # #     class Meta:
# # # # #         ordering = ['-applied_date']

# # # # # class Schedule(models.Model):
# # # # #     TYPE_CHOICES = [
# # # # #         ('visit', 'Visit'),
# # # # #         ('meeting', 'Meeting'),
# # # # #         ('training', 'Training'),
# # # # #         ('other', 'Other'),
# # # # #     ]
    
# # # # #     STATUS_CHOICES = [
# # # # #         ('pending', 'Pending'),
# # # # #         ('completed', 'Completed'),
# # # # #         ('cancelled', 'Cancelled'),
# # # # #     ]
    
# # # # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # # # #     title = models.CharField(max_length=200)
# # # # #     description = models.TextField(blank=True)
# # # # #     date = models.DateField()
# # # # #     time = models.TimeField()
# # # # #     type = models.CharField(max_length=20, choices=TYPE_CHOICES)
# # # # #     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
# # # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # # #     def __str__(self):
# # # # #         return f"{self.title} - {self.date}"
    
# # # # #     class Meta:
# # # # #         ordering = ['date', 'time']

# # # # from django.db import models
# # # # from django.contrib.auth.models import User
# # # # from django.utils import timezone
# # # # from datetime import date

# # # # class Company(models.Model):
# # # #     name = models.CharField(max_length=200, unique=True)
# # # #     address = models.TextField(blank=True)
# # # #     phone = models.CharField(max_length=20, blank=True)
# # # #     email = models.EmailField(blank=True)
# # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # #     def __str__(self):
# # # #         return self.name
    
# # # #     class Meta:
# # # #         verbose_name_plural = "Companies"

# # # # class UserProfile(models.Model):
# # # #     ROLE_CHOICES = [
# # # #         ('employee', 'Employee'),
# # # #         ('owner', 'Company Owner'),
# # # #     ]
    
# # # #     user = models.OneToOneField(User, on_delete=models.CASCADE)
# # # #     role = models.CharField(max_length=10, choices=ROLE_CHOICES)
# # # #     company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
# # # #     phone = models.CharField(max_length=20, blank=True)
    
# # # #     def __str__(self):
# # # #         return f"{self.user.username} - {self.role}"

# # # # class Employee(models.Model):
# # # #     user = models.OneToOneField(User, on_delete=models.CASCADE)
# # # #     employee_id = models.CharField(max_length=20, unique=True)
# # # #     phone = models.CharField(max_length=20)
# # # #     designation = models.CharField(max_length=100)
# # # #     joining_date = models.DateField()
# # # #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# # # #     is_active = models.BooleanField(default=True)
    
# # # #     def __str__(self):
# # # #         return f"{self.user.first_name} {self.user.last_name} - {self.employee_id}"

# # # # class Organization(models.Model):
# # # #     ORGANIZATION_TYPES = [
# # # #         ('hospital', 'Hospital'),
# # # #         ('clinic', 'Clinic'),
# # # #         ('pharmacy', 'Pharmacy'),
# # # #         ('laboratory', 'Laboratory'),
# # # #         ('other', 'Other'),
# # # #     ]
    
# # # #     name = models.CharField(max_length=200)
# # # #     address = models.TextField()
# # # #     phone = models.CharField(max_length=20)
# # # #     email = models.EmailField(blank=True)
# # # #     type = models.CharField(max_length=20, choices=ORGANIZATION_TYPES)
# # # #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # #     def __str__(self):
# # # #         return self.name

# # # # class Doctor(models.Model):
# # # #     name = models.CharField(max_length=200)
# # # #     specialization = models.CharField(max_length=100)
# # # #     phone = models.CharField(max_length=20)
# # # #     email = models.EmailField(blank=True)
# # # #     organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
# # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # #     def __str__(self):
# # # #         return f"Dr. {self.name} - {self.specialization}"

# # # # class Product(models.Model):
# # # #     name = models.CharField(max_length=200)
# # # #     description = models.TextField()
# # # #     category = models.CharField(max_length=100)
# # # #     price = models.DecimalField(max_digits=10, decimal_places=2)
# # # #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# # # #     is_active = models.BooleanField(default=True)
# # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # #     def __str__(self):
# # # #         return self.name

# # # # class Visit(models.Model):
# # # #     STATUS_CHOICES = [
# # # #         ('scheduled', 'Scheduled'),
# # # #         ('ongoing', 'Ongoing'),
# # # #         ('completed', 'Completed'),
# # # #         ('cancelled', 'Cancelled'),
# # # #     ]
    
# # # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # # #     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
# # # #     organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
# # # #     products = models.ManyToManyField(Product, blank=True)
# # # #     visit_date = models.DateField()
# # # #     visit_time = models.TimeField()
# # # #     duration = models.IntegerField(help_text="Duration in minutes", default=30)
# # # #     notes = models.TextField(blank=True)
# # # #     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
# # # #     created_at = models.DateTimeField(auto_now_add=True)
# # # #     updated_at = models.DateTimeField(auto_now=True)
    
# # # #     def __str__(self):
# # # #         return f"{self.employee.user.first_name} visits Dr. {self.doctor.name} on {self.visit_date}"
    
# # # #     class Meta:
# # # #         ordering = ['-visit_date', '-visit_time']

# # # # class Attendance(models.Model):
# # # #     STATUS_CHOICES = [
# # # #         ('present', 'Present'),
# # # #         ('absent', 'Absent'),
# # # #         ('partial', 'Partial'),
# # # #         ('leave', 'On Leave'),
# # # #     ]
    
# # # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # # #     date = models.DateField()
# # # #     check_in = models.TimeField(null=True, blank=True)
# # # #     check_out = models.TimeField(null=True, blank=True)
# # # #     status = models.CharField(max_length=10, choices=STATUS_CHOICES)
# # # #     notes = models.TextField(blank=True)
# # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # #     def __str__(self):
# # # #         return f"{self.employee.user.first_name} - {self.date} - {self.status}"
    
# # # #     class Meta:
# # # #         unique_together = ['employee', 'date']
# # # #         ordering = ['-date']

# # # # class LeaveRequest(models.Model):
# # # #     LEAVE_TYPES = [
# # # #         ('sick', 'Sick Leave'),
# # # #         ('casual', 'Casual Leave'),
# # # #         ('vacation', 'Vacation'),
# # # #         ('emergency', 'Emergency Leave'),
# # # #         ('other', 'Other'),
# # # #     ]
    
# # # #     STATUS_CHOICES = [
# # # #         ('pending', 'Pending'),
# # # #         ('approved', 'Approved'),
# # # #         ('rejected', 'Rejected'),
# # # #     ]
    
# # # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # # #     leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
# # # #     start_date = models.DateField()
# # # #     end_date = models.DateField()
# # # #     reason = models.TextField()
# # # #     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
# # # #     applied_date = models.DateTimeField(auto_now_add=True)
# # # #     approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_leaves')
# # # #     approved_date = models.DateTimeField(null=True, blank=True)
# # # #     comments = models.TextField(blank=True)
    
# # # #     def __str__(self):
# # # #         return f"{self.employee.user.first_name} - {self.leave_type} - {self.start_date} to {self.end_date}"
    
# # # #     class Meta:
# # # #         ordering = ['-applied_date']

# # # # class Schedule(models.Model):
# # # #     TYPE_CHOICES = [
# # # #         ('visit', 'Visit'),
# # # #         ('meeting', 'Meeting'),
# # # #         ('training', 'Training'),
# # # #         ('other', 'Other'),
# # # #     ]
    
# # # #     STATUS_CHOICES = [
# # # #         ('pending', 'Pending'),
# # # #         ('completed', 'Completed'),
# # # #         ('cancelled', 'Cancelled'),
# # # #     ]
    
# # # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # # #     title = models.CharField(max_length=200)
# # # #     description = models.TextField(blank=True)
# # # #     date = models.DateField()
# # # #     time = models.TimeField()
# # # #     type = models.CharField(max_length=20, choices=TYPE_CHOICES)
# # # #     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
# # # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # # #     def __str__(self):
# # # #         return f"{self.title} - {self.date}"
    
# # # #     class Meta:
# # # #         ordering = ['date', 'time']

# # # # your_app/models.py
# # # from django.db import models
# # # from django.contrib.auth.models import User
# # # from django.utils import timezone
# # # from datetime import date

# # # class Company(models.Model):
# # #     name = models.CharField(max_length=200, unique=True)
# # #     address = models.TextField(blank=True)
# # #     phone = models.CharField(max_length=20, blank=True)
# # #     email = models.EmailField(blank=True)
# # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # #     def __str__(self):
# # #         return self.name
    
# # #     class Meta:
# # #         verbose_name_plural = "Companies"

# # # class UserProfile(models.Model):
# # #     ROLE_CHOICES = [
# # #         ('employee', 'Employee'),
# # #         ('owner', 'Company Owner'),
# # #     ]
    
# # #     user = models.OneToOneField(User, on_delete=models.CASCADE)
# # #     role = models.CharField(max_length=10, choices=ROLE_CHOICES)
# # #     company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
# # #     phone = models.CharField(max_length=20, blank=True)
    
# # #     def __str__(self):
# # #         return f"{self.user.username} - {self.role}"

# # # class Employee(models.Model):
# # #     user = models.OneToOneField(User, on_delete=models.CASCADE)
# # #     employee_id = models.CharField(max_length=20, unique=True)
# # #     phone = models.CharField(max_length=20)
# # #     designation = models.CharField(max_length=100)
# # #     joining_date = models.DateField()
# # #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# # #     is_active = models.BooleanField(default=True)
    
# # #     def __str__(self):
# # #         return f"{self.user.first_name} {self.user.last_name} - {self.employee_id}"

# # # class Organization(models.Model):
# # #     ORGANIZATION_TYPES = [
# # #         ('hospital', 'Hospital'),
# # #         ('clinic', 'Clinic'),
# # #         ('pharmacy', 'Pharmacy'),
# # #         ('laboratory', 'Laboratory'),
# # #         ('other', 'Other'),
# # #     ]
    
# # #     name = models.CharField(max_length=200)
# # #     address = models.TextField()
# # #     phone = models.CharField(max_length=20)
# # #     email = models.EmailField(blank=True)
# # #     type = models.CharField(max_length=20, choices=ORGANIZATION_TYPES)
# # #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # #     def __str__(self):
# # #         return self.name

# # # class Doctor(models.Model):
# # #     name = models.CharField(max_length=200)
# # #     specialization = models.CharField(max_length=100)
# # #     phone = models.CharField(max_length=20)
# # #     email = models.EmailField(blank=True)
# # #     organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
# # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # #     def __str__(self):
# # #         return f"Dr. {self.name} - {self.specialization}"

# # # class Product(models.Model):
# # #     name = models.CharField(max_length=200)
# # #     description = models.TextField()
# # #     category = models.CharField(max_length=100)
# # #     price = models.DecimalField(max_digits=10, decimal_places=2)
# # #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# # #     is_active = models.BooleanField(default=True)
# # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # #     def __str__(self):
# # #         return self.name

# # # class Visit(models.Model):
# # #     STATUS_CHOICES = [
# # #         ('scheduled', 'Scheduled'),
# # #         ('ongoing', 'Ongoing'),
# # #         ('completed', 'Completed'),
# # #         ('cancelled', 'Cancelled'),
# # #     ]
    
# # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # #     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
# # #     organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
# # #     products = models.ManyToManyField(Product, blank=True)
# # #     visit_date = models.DateField()
# # #     visit_time = models.TimeField()
# # #     duration = models.IntegerField(help_text="Duration in minutes", default=30)
# # #     notes = models.TextField(blank=True)
# # #     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
# # #     created_at = models.DateTimeField(auto_now_add=True)
# # #     updated_at = models.DateTimeField(auto_now=True)
    
# # #     def __str__(self):
# # #         return f"{self.employee.user.first_name} visits Dr. {self.doctor.name} on {self.visit_date}"
    
# # #     class Meta:
# # #         ordering = ['-visit_date', '-visit_time']

# # # class Attendance(models.Model):
# # #     STATUS_CHOICES = [
# # #         ('present', 'Present'),
# # #         ('absent', 'Absent'),
# # #         ('partial', 'Partial'),
# # #         ('leave', 'On Leave'),
# # #     ]
    
# # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # #     date = models.DateField()
# # #     check_in = models.TimeField(null=True, blank=True)
# # #     check_out = models.TimeField(null=True, blank=True)
# # #     status = models.CharField(max_length=10, choices=STATUS_CHOICES)
# # #     notes = models.TextField(blank=True)
# # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # #     def __str__(self):
# # #         return f"{self.employee.user.first_name} - {self.date} - {self.status}"
    
# # #     class Meta:
# # #         unique_together = ['employee', 'date']
# # #         ordering = ['-date']

# # # class LeaveRequest(models.Model):
# # #     LEAVE_TYPES = [
# # #         ('sick', 'Sick Leave'),
# # #         ('casual', 'Casual Leave'),
# # #         ('vacation', 'Vacation'),
# # #         ('emergency', 'Emergency Leave'),
# # #         ('other', 'Other'),
# # #     ]
    
# # #     STATUS_CHOICES = [
# # #         ('pending', 'Pending'),
# # #         ('approved', 'Approved'),
# # #         ('rejected', 'Rejected'),
# # #     ]
    
# # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # #     leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
# # #     start_date = models.DateField()
# # #     end_date = models.DateField()
# # #     reason = models.TextField()
# # #     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
# # #     applied_date = models.DateTimeField(auto_now_add=True)
# # #     approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_leaves')
# # #     approved_date = models.DateTimeField(null=True, blank=True)
# # #     comments = models.TextField(blank=True)
    
# # #     def __str__(self):
# # #         return f"{self.employee.user.first_name} - {self.leave_type} - {self.start_date} to {self.end_date}"
    
# # #     class Meta:
# # #         ordering = ['-applied_date']

# # # class Schedule(models.Model):
# # #     TYPE_CHOICES = [
# # #         ('visit', 'Visit'),
# # #         ('meeting', 'Meeting'),
# # #         ('training', 'Training'),
# # #         ('other', 'Other'),
# # #     ]
    
# # #     STATUS_CHOICES = [
# # #         ('pending', 'Pending'),
# # #         ('completed', 'Completed'),
# # #         ('cancelled', 'Cancelled'),
# # #     ]
    
# # #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# # #     title = models.CharField(max_length=200)
# # #     description = models.TextField(blank=True)
# # #     date = models.DateField()
# # #     time = models.TimeField()
# # #     type = models.CharField(max_length=20, choices=TYPE_CHOICES)
# # #     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
# # #     created_at = models.DateTimeField(auto_now_add=True)
    
# # #     def __str__(self):
# # #         return f"{self.title} - {self.date}"
    
# # #     class Meta:
# # #         ordering = ['date', 'time']


# # from django.db import models
# # from django.contrib.auth.models import User
# # from django.utils import timezone
# # from datetime import date

# # class Company(models.Model):
# #     name = models.CharField(max_length=200, unique=True)
# #     address = models.TextField(blank=True)
# #     phone = models.CharField(max_length=20, blank=True)
# #     email = models.EmailField(blank=True)
# #     created_at = models.DateTimeField(auto_now_add=True)
    
# #     def __str__(self):
# #         return self.name
    
# #     class Meta:
# #         verbose_name_plural = "Companies"

# # class UserProfile(models.Model):
# #     ROLE_CHOICES = [
# #         ('employee', 'Employee'),
# #         ('owner', 'Company Owner'),
# #     ]
    
# #     user = models.OneToOneField(User, on_delete=models.CASCADE)
# #     role = models.CharField(max_length=10, choices=ROLE_CHOICES)
# #     company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
# #     phone = models.CharField(max_length=20, blank=True)
    
# #     def __str__(self):
# #         return f"{self.user.username} - {self.role}"

# # class Employee(models.Model):
# #     user = models.OneToOneField(User, on_delete=models.CASCADE)
# #     employee_id = models.CharField(max_length=20, unique=True)
# #     phone = models.CharField(max_length=20)
# #     designation = models.CharField(max_length=100)
# #     joining_date = models.DateField()
# #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# #     is_active = models.BooleanField(default=True)
    
# #     def __str__(self):
# #         return f"{self.user.first_name} {self.user.last_name} - {self.employee_id}"

# # class Organization(models.Model):
# #     ORGANIZATION_TYPES = [
# #         ('hospital', 'Hospital'),
# #         ('clinic', 'Clinic'),
# #         ('pharmacy', 'Pharmacy'),
# #         ('laboratory', 'Laboratory'),
# #         ('other', 'Other'),
# #     ]
    
# #     name = models.CharField(max_length=200)
# #     address = models.TextField()
# #     phone = models.CharField(max_length=20)
# #     email = models.EmailField(blank=True)
# #     type = models.CharField(max_length=20, choices=ORGANIZATION_TYPES)
# #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# #     doctors = models.ManyToManyField('Doctor', related_name='organizations', blank=True)  # Added doctors field
# #     created_at = models.DateTimeField(auto_now_add=True)
    
# #     def __str__(self):
# #         return self.name

# # class Doctor(models.Model):
# #     name = models.CharField(max_length=200)
# #     specialization = models.CharField(max_length=100)
# #     phone = models.CharField(max_length=20)
# #     email = models.EmailField(blank=True)
# #     created_at = models.DateTimeField(auto_now_add=True)
    
# #     def __str__(self):
# #         return f"Dr. {self.name} - {self.specialization}"

# # class Product(models.Model):
# #     name = models.CharField(max_length=200)
# #     description = models.TextField()
# #     category = models.CharField(max_length=100)
# #     price = models.DecimalField(max_digits=10, decimal_places=2)
# #     company = models.ForeignKey(Company, on_delete=models.CASCADE)
# #     is_active = models.BooleanField(default=True)
# #     created_at = models.DateTimeField(auto_now_add=True)
    
# #     def __str__(self):
# #         return self.name

# # class Visit(models.Model):
# #     STATUS_CHOICES = [
# #         ('scheduled', 'Scheduled'),
# #         ('ongoing', 'Ongoing'),
# #         ('completed', 'Completed'),
# #         ('cancelled', 'Cancelled'),
# #     ]
    
# #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# #     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
# #     organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
# #     products = models.ManyToManyField(Product, blank=True)
# #     visit_date = models.DateField()
# #     visit_time = models.TimeField()
# #     duration = models.IntegerField(help_text="Duration in minutes", default=30)
# #     notes = models.TextField(blank=True)
# #     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
# #     created_at = models.DateTimeField(auto_now_add=True)
# #     updated_at = models.DateTimeField(auto_now=True)
    
# #     def __str__(self):
# #         return f"{self.employee.user.first_name} visits Dr. {self.doctor.name} on {self.visit_date}"
    
# #     class Meta:
# #         ordering = ['-visit_date', '-visit_time']

# # class Attendance(models.Model):
# #     STATUS_CHOICES = [
# #         ('present', 'Present'),
# #         ('absent', 'Absent'),
# #         ('partial', 'Partial'),
# #         ('leave', 'On Leave'),
# #     ]
    
# #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# #     date = models.DateField()
# #     check_in = models.TimeField(null=True, blank=True)
# #     check_out = models.TimeField(null=True, blank=True)
# #     status = models.CharField(max_length=10, choices=STATUS_CHOICES)
# #     notes = models.TextField(blank=True)
# #     created_at = models.DateTimeField(auto_now_add=True)
    
# #     def __str__(self):
# #         return f"{self.employee.user.first_name} - {self.date} - {self.status}"
    
# #     class Meta:
# #         unique_together = ['employee', 'date']
# #         ordering = ['-date']

# # class LeaveRequest(models.Model):
# #     LEAVE_TYPES = [
# #         ('sick', 'Sick Leave'),
# #         ('casual', 'Casual Leave'),
# #         ('vacation', 'Vacation'),
# #         ('emergency', 'Emergency Leave'),
# #         ('other', 'Other'),
# #     ]
    
# #     STATUS_CHOICES = [
# #         ('pending', 'Pending'),
# #         ('approved', 'Approved'),
# #         ('rejected', 'Rejected'),
# #     ]
    
# #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# #     leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
# #     start_date = models.DateField()
# #     end_date = models.DateField()
# #     reason = models.TextField()
# #     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
# #     applied_date = models.DateTimeField(auto_now_add=True)
# #     approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_leaves')
# #     approved_date = models.DateTimeField(null=True, blank=True)
# #     comments = models.TextField(blank=True)
    
# #     def __str__(self):
# #         return f"{self.employee.user.first_name} - {self.leave_type} - {self.start_date} to {self.end_date}"
    
# #     class Meta:
# #         ordering = ['-applied_date']

# # class Schedule(models.Model):
# #     TYPE_CHOICES = [
# #         ('visit', 'director'),
# #         ('meeting', 'Meeting'),
# #         ('training', 'employee'),
# #         ('other', 'Other'),
# #     ]
    
# #     STATUS_CHOICES = [
# #         ('pending', 'employee'),
# #         ('completed', 'Completed'),
# #         ('cancelled', 'Cancelled'),
# #     ]
    
# #     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
# #     title = models.CharField(max_length=200)
# #     department = models.ForeignKey(Department, on_delete=models.CASCADE)
# #     notes = models.TextField(blank=True)
# #     date = models.DateField()
# #     time = models.TimeField()
# #     created_at = models.DateTimeField(auto_now_add=True)
    
# #     def __str__(self):
# #         return f"{self.title} - {self.date}"
    
# #     class Meta:
# #         ordering = ['date', 'time']


# from django.db import models
# from django.contrib.auth.models import User
# from django.utils import timezone
# from datetime import date

# class Company(models.Model):
#     name = models.CharField(max_length=200, unique=True)
#     address = models.TextField(blank=True)
#     phone = models.CharField(max_length=20, blank=True)
#     email = models.EmailField(blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return self.name
    
#     class Meta:
#         verbose_name_plural = "Companies"

# class UserProfile(models.Model):
#     ROLE_CHOICES = [
#         ('employee', 'Employee'),
#         ('owner', 'Company Owner'),
#     ]
    
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     role = models.CharField(max_length=10, choices=ROLE_CHOICES)
#     company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
#     phone = models.CharField(max_length=20, blank=True)
    
#     def __str__(self):
#         return f"{self.user.username} - {self.role}"

# class Employee(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     employee_id = models.CharField(max_length=20, unique=True)
#     phone = models.CharField(max_length=20)
#     designation = models.CharField(max_length=100)
#     joining_date = models.DateField()
#     company = models.ForeignKey(Company, on_delete=models.CASCADE)
#     is_active = models.BooleanField(default=True)
    
#     def __str__(self):
#         return f"{self.user.first_name} {self.user.last_name} - {self.employee_id}"

# class Organization(models.Model):
#     ORGANIZATION_TYPES = [
#         ('hospital', 'Hospital'),
#         ('clinic', 'Clinic'),
#         ('pharmacy', 'Pharmacy'),
#         ('laboratory', 'Laboratory'),
#         ('other', 'Other'),
#     ]
    
#     name = models.CharField(max_length=200)
#     address = models.TextField()
#     phone = models.CharField(max_length=20)
#     email = models.EmailField(blank=True)
#     type = models.CharField(max_length=20, choices=ORGANIZATION_TYPES)
#     company = models.ForeignKey(Company, on_delete=models.CASCADE)
#     doctors = models.ManyToManyField('Doctor', related_name='organizations', blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return self.name

# class Doctor(models.Model):
#     name = models.CharField(max_length=200)
#     specialization = models.CharField(max_length=100)
#     phone = models.CharField(max_length=20)
#     email = models.EmailField(blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return f"Dr. {self.name} - {self.specialization}"

# class Product(models.Model):
#     name = models.CharField(max_length=200)
#     description = models.TextField()
#     category = models.CharField(max_length=100)
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     company = models.ForeignKey(Company, on_delete=models.CASCADE)
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return self.name

# class Visit(models.Model):
#     STATUS_CHOICES = [
#         ('scheduled', 'Scheduled'),
#         ('ongoing', 'Ongoing'),
#         ('completed', 'Completed'),
#         ('cancelled', 'Cancelled'),
#     ]
    
#     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
#     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
#     organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
#     products = models.ManyToManyField(Product, blank=True)
#     visit_date = models.DateField()
#     visit_time = models.TimeField()
#     duration = models.IntegerField(help_text="Duration in minutes", default=30)
#     notes = models.TextField(blank=True)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
    
#     def __str__(self):
#         return f"{self.employee.user.first_name} visits Dr. {self.doctor.name} on {self.visit_date}"
    
#     class Meta:
#         ordering = ['-visit_date', '-visit_time']

# class Attendance(models.Model):
#     STATUS_CHOICES = [
#         ('present', 'Present'),
#         ('absent', 'Absent'),
#         ('partial', 'Partial'),
#         ('leave', 'On Leave'),
#     ]
    
#     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
#     date = models.DateField()
#     check_in = models.TimeField(null=True, blank=True)
#     check_out = models.TimeField(null=True, blank=True)
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES)
#     notes = models.TextField(blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return f"{self.employee.user.first_name} - {self.date} - {self.status}"
    
#     class Meta:
#         unique_together = ['employee', 'date']
#         ordering = ['-date']

# class LeaveRequest(models.Model):
#     LEAVE_TYPES = [
#         ('sick', 'Sick Leave'),
#         ('casual', 'Casual Leave'),
#         ('vacation', 'Vacation'),
#         ('emergency', 'Emergency Leave'),
#         ('other', 'Other'),
#     ]
    
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('approved', 'Approved'),
#         ('rejected', 'Rejected'),
#     ]
    
#     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
#     leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
#     start_date = models.DateField()
#     end_date = models.DateField()
#     reason = models.TextField()
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
#     applied_date = models.DateTimeField(auto_now_add=True)
#     approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_leaves')
#     approved_date = models.DateTimeField(null=True, blank=True)
#     comments = models.TextField(blank=True)
    
#     def __str__(self):
#         return f"{self.employee.user.first_name} - {self.leave_type} - {self.start_date} to {self.end_date}"
    
#     class Meta:
#         ordering = ['-applied_date']

# class Schedule(models.Model):
#     TYPE_CHOICES = [
#         ('visit', 'Visit'),
#         ('meeting', 'Meeting'),
#         ('training', 'Training'),
#         ('other', 'Other'),
#     ]
    
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('completed', 'Completed'),
#         ('cancelled', 'Cancelled'),
#     ]
    
#     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
#     title = models.CharField(max_length=200)
#     type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='other')
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
#     notes = models.TextField(blank=True)
#     date = models.DateField()
#     time = models.TimeField()
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return f"{self.title} - {self.date}"
    
#     class Meta:
#         ordering = ['date', 'time']


from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date

class Company(models.Model):
    name = models.CharField(max_length=200, unique=True)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Companies"

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('employee', 'Employee'),
        ('owner', 'Company Owner'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, null=True, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.role}"

class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    employee_id = models.CharField(max_length=20, unique=True)
    phone = models.CharField(max_length=20)
    designation = models.CharField(max_length=100)
    joining_date = models.DateField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name} - {self.employee_id}"

class Organization(models.Model):
    ORGANIZATION_TYPES = [
        ('hospital', 'Hospital'),
        ('clinic', 'Clinic'),
        ('pharmacy', 'Pharmacy'),
        ('laboratory', 'Laboratory'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=200)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    type = models.CharField(max_length=20, choices=ORGANIZATION_TYPES)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    doctors = models.ManyToManyField('Doctor', related_name='organizations', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Doctor(models.Model):
    name = models.CharField(max_length=200)
    specialization = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Dr. {self.name} - {self.specialization}"

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Visit(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, blank=True)
    visit_date = models.DateField()
    visit_time = models.TimeField()
    duration = models.IntegerField(help_text="Duration in minutes", default=30)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.employee.user.first_name} visits Dr. {self.doctor.name} on {self.visit_date}"
    
    class Meta:
        ordering = ['-visit_date', '-visit_time']

class Attendance(models.Model):
    STATUS_CHOICES = [
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('partial', 'Partial'),
        ('leave', 'On Leave'),
    ]
    
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    check_in = models.TimeField(null=True, blank=True)
    check_out = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.employee.user.first_name} - {self.date} - {self.status}"
    
    class Meta:
        unique_together = ['employee', 'date']
        ordering = ['-date']

class LeaveRequest(models.Model):
    LEAVE_TYPES = [
        ('sick', 'Sick Leave'),
        ('casual', 'Casual Leave'),
        ('vacation', 'Vacation'),
        ('emergency', 'Emergency Leave'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
    
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    applied_date = models.DateTimeField(auto_now_add=True)
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_leaves')
    approved_date = models.DateTimeField(null=True, blank=True)
    comments = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.employee.user.first_name} - {self.leave_type} - {self.start_date} to {self.end_date}"
    
    class Meta:
        ordering = ['-applied_date']

class Schedule(models.Model):
    TYPE_CHOICES = [
        ('visit', 'Visit'),
        ('meeting', 'Meeting'),
        ('training', 'Training'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='other')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)
    date = models.DateField()
    time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.title} - {self.date}"
    
    class Meta:
        ordering = ['date', 'time']

        