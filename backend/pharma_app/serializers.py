# # # # # from rest_framework import serializers
# # # # # from django.contrib.auth.models import User
# # # # # from django.contrib.auth.hashers import make_password
# # # # # from .models import (
# # # # #     Company, UserProfile, Employee, Organization, 
# # # # #     Doctor, Product, Visit, Attendance, Schedule, LeaveRequest
# # # # # )

# # # # # class UserSerializer(serializers.ModelSerializer):
# # # # #     class Meta:
# # # # #         model = User
# # # # #         fields = ['id', 'username', 'email', 'first_name', 'last_name']

# # # # # class UserProfileSerializer(serializers.ModelSerializer):
# # # # #     user = UserSerializer(read_only=True)
    
# # # # #     class Meta:
# # # # #         model = UserProfile
# # # # #         fields = ['user', 'role', 'company', 'phone']

# # # # # class CompanySerializer(serializers.ModelSerializer):
# # # # #     class Meta:
# # # # #         model = Company
# # # # #         fields = '__all__'

# # # # # class EmployeeSerializer(serializers.ModelSerializer):
# # # # #     user = UserSerializer(read_only=True)
# # # # #     company_name = serializers.CharField(source='company.name', read_only=True)
    
# # # # #     class Meta:
# # # # #         model = Employee
# # # # #         fields = ['id', 'user', 'employee_id', 'phone', 'designation', 
# # # # #                  'joining_date', 'company', 'company_name', 'is_active']

# # # # # class OrganizationSerializer(serializers.ModelSerializer):
# # # # #     class Meta:
# # # # #         model = Organization
# # # # #         fields = '__all__'

# # # # # class DoctorSerializer(serializers.ModelSerializer):
# # # # #     organization_name = serializers.CharField(source='organization.name', read_only=True)
    
# # # # #     class Meta:
# # # # #         model = Doctor
# # # # #         fields = ['id', 'name', 'specialization', 'phone', 'email', 
# # # # #                  'organization', 'organization_name', 'created_at']

# # # # # class ProductSerializer(serializers.ModelSerializer):
# # # # #     class Meta:
# # # # #         model = Product
# # # # #         fields = '__all__'

# # # # # class VisitSerializer(serializers.ModelSerializer):
# # # # #     employee_name = serializers.CharField(
# # # # #         source='employee.user.first_name', read_only=True
# # # # #     )
# # # # #     doctor_name = serializers.CharField(source='doctor.name', read_only=True)
# # # # #     organization_name = serializers.CharField(
# # # # #         source='organization.name', read_only=True
# # # # #     )
# # # # #     product_names = serializers.SerializerMethodField()
    
# # # # #     class Meta:
# # # # #         model = Visit
# # # # #         fields = '__all__'
    
# # # # #     def get_product_names(self, obj):
# # # # #         return [product.name for product in obj.products.all()]

# # # # # class AttendanceSerializer(serializers.ModelSerializer):
# # # # #     employee_name = serializers.CharField(
# # # # #         source='employee.user.first_name', read_only=True
# # # # #     )
    
# # # # #     class Meta:
# # # # #         model = Attendance
# # # # #         fields = '__all__'

# # # # # class LeaveRequestSerializer(serializers.ModelSerializer):
# # # # #     employee_name = serializers.CharField(
# # # # #         source='employee.user.first_name', read_only=True
# # # # #     )
# # # # #     approved_by_name = serializers.CharField(
# # # # #         source='approved_by.first_name', read_only=True
# # # # #     )
    
# # # # #     class Meta:
# # # # #         model = LeaveRequest
# # # # #         fields = '__all__'

# # # # # class ScheduleSerializer(serializers.ModelSerializer):
# # # # #     employee_name = serializers.CharField(
# # # # #         source='employee.user.first_name', read_only=True
# # # # #     )
    
# # # # #     class Meta:
# # # # #         model = Schedule
# # # # #         fields = '__all__'

# # # # # class UserRegistrationSerializer(serializers.ModelSerializer):
# # # # #     password = serializers.CharField(write_only=True)
# # # # #     role = serializers.CharField()
# # # # #     phone = serializers.CharField()
# # # # #     company_id = serializers.IntegerField(required=False)
    
# # # # #     class Meta:
# # # # #         model = User
# # # # #         fields = ['username', 'password', 'email', 'first_name', 'last_name', 'role', 'phone', 'company_id']
    
# # # # #     def create(self, validated_data):
# # # # #         role = validated_data.pop('role')
# # # # #         phone = validated_data.pop('phone')
# # # # #         company_id = validated_data.pop('company_id', None)
        
# # # # #         user = User.objects.create_user(
# # # # #             username=validated_data['username'],
# # # # #             password=validated_data['password'],
# # # # #             email=validated_data['email'],
# # # # #             first_name=validated_data['first_name'],
# # # # #             last_name=validated_data['last_name']
# # # # #         )
        
# # # # #         company = None
# # # # #         if company_id:
# # # # #             try:
# # # # #                 company = Company.objects.get(id=company_id)
# # # # #             except Company.DoesNotExist:
# # # # #                 pass
        
# # # # #         UserProfile.objects.create(
# # # # #             user=user,
# # # # #             role=role,
# # # # #             phone=phone,
# # # # #             company=company
# # # # #         )
        
# # # # #         return user

# # # # # class EmployeeCreateSerializer(serializers.Serializer):
# # # # #     username = serializers.CharField()
# # # # #     password = serializers.CharField()
# # # # #     email = serializers.EmailField()
# # # # #     first_name = serializers.CharField()
# # # # #     last_name = serializers.CharField()
# # # # #     employee_id = serializers.CharField()
# # # # #     phone = serializers.CharField()
# # # # #     designation = serializers.CharField()
# # # # #     joining_date = serializers.DateField()
# # # # #     is_active = serializers.BooleanField(default=True)
    
# # # # #     def create(self, validated_data):
# # # # #         # Get the company from the request user
# # # # #         request = self.context.get('request')
# # # # #         user_profile = UserProfile.objects.get(user=request.user)
# # # # #         company = user_profile.company
        
# # # # #         # Create user
# # # # #         user = User.objects.create_user(
# # # # #             username=validated_data['username'],
# # # # #             password=validated_data['password'],
# # # # #             email=validated_data['email'],
# # # # #             first_name=validated_data['first_name'],
# # # # #             last_name=validated_data['last_name']
# # # # #         )
        
# # # # #         # Create user profile
# # # # #         UserProfile.objects.create(
# # # # #             user=user,
# # # # #             role='employee',
# # # # #             phone=validated_data['phone'],
# # # # #             company=company
# # # # #         )
        
# # # # #         # Create employee
# # # # #         employee = Employee.objects.create(
# # # # #             user=user,
# # # # #             employee_id=validated_data['employee_id'],
# # # # #             phone=validated_data['phone'],
# # # # #             designation=validated_data['designation'],
# # # # #             joining_date=validated_data['joining_date'],
# # # # #             company=company,
# # # # #             is_active=validated_data['is_active']
# # # # #         )
        
# # # # #         return employee

# # # # from rest_framework import serializers
# # # # from django.contrib.auth.models import User
# # # # from django.contrib.auth.hashers import make_password
# # # # from .models import (
# # # #     Company, UserProfile, Employee, Organization, 
# # # #     Doctor, Product, Visit, Attendance, Schedule, LeaveRequest
# # # # )

# # # # class UserSerializer(serializers.ModelSerializer):
# # # #     class Meta:
# # # #         model = User
# # # #         fields = ['id', 'username', 'email', 'first_name', 'last_name']

# # # # class UserProfileSerializer(serializers.ModelSerializer):
# # # #     user = UserSerializer(read_only=True)
    
# # # #     class Meta:
# # # #         model = UserProfile
# # # #         fields = ['user', 'role', 'company', 'phone']

# # # # class CompanySerializer(serializers.ModelSerializer):
# # # #     class Meta:
# # # #         model = Company
# # # #         fields = '__all__'

# # # # class EmployeeSerializer(serializers.ModelSerializer):
# # # #     user = UserSerializer(read_only=True)
# # # #     company_name = serializers.CharField(source='company.name', read_only=True)
    
# # # #     class Meta:
# # # #         model = Employee
# # # #         fields = ['id', 'user', 'employee_id', 'phone', 'designation', 
# # # #                  'joining_date', 'company', 'company_name', 'is_active']

# # # # class OrganizationSerializer(serializers.ModelSerializer):
# # # #     class Meta:
# # # #         model = Organization
# # # #         fields = '__all__'

# # # # class DoctorSerializer(serializers.ModelSerializer):
# # # #     organization_name = serializers.CharField(source='organization.name', read_only=True)
    
# # # #     class Meta:
# # # #         model = Doctor
# # # #         fields = ['id', 'name', 'specialization', 'phone', 'email', 
# # # #                  'organization', 'organization_name', 'created_at']

# # # # class ProductSerializer(serializers.ModelSerializer):
# # # #     class Meta:
# # # #         model = Product
# # # #         fields = ['id', 'name', 'description', 'category', 'price', 'company', 'is_active', 'created_at']
# # # #         extra_kwargs = {
# # # #             'company': {'required': False}  # Make company optional
# # # #         }

# # # # class VisitSerializer(serializers.ModelSerializer):
# # # #     employee_name = serializers.CharField(
# # # #         source='employee.user.first_name', read_only=True
# # # #     )
# # # #     doctor_name = serializers.CharField(source='doctor.name', read_only=True)
# # # #     organization_name = serializers.CharField(
# # # #         source='organization.name', read_only=True
# # # #     )
# # # #     product_names = serializers.SerializerMethodField()
    
# # # #     class Meta:
# # # #         model = Visit
# # # #         fields = '__all__'
    
# # # #     def get_product_names(self, obj):
# # # #         return [product.name for product in obj.products.all()]

# # # # class AttendanceSerializer(serializers.ModelSerializer):
# # # #     employee_name = serializers.CharField(
# # # #         source='employee.user.first_name', read_only=True
# # # #     )
    
# # # #     class Meta:
# # # #         model = Attendance
# # # #         fields = '__all__'

# # # # class LeaveRequestSerializer(serializers.ModelSerializer):
# # # #     employee_name = serializers.CharField(
# # # #         source='employee.user.first_name', read_only=True
# # # #     )
# # # #     approved_by_name = serializers.CharField(
# # # #         source='approved_by.first_name', read_only=True
# # # #     )
    
# # # #     class Meta:
# # # #         model = LeaveRequest
# # # #         fields = '__all__'

# # # # class ScheduleSerializer(serializers.ModelSerializer):
# # # #     employee_name = serializers.CharField(
# # # #         source='employee.user.first_name', read_only=True
# # # #     )
    
# # # #     class Meta:
# # # #         model = Schedule
# # # #         fields = '__all__'

# # # # class UserRegistrationSerializer(serializers.ModelSerializer):
# # # #     password = serializers.CharField(write_only=True)
# # # #     role = serializers.CharField()
# # # #     phone = serializers.CharField()
# # # #     company = serializers.CharField()
    
# # # #     class Meta:
# # # #         model = User
# # # #         fields = ['username', 'password', 'email', 'first_name', 'last_name', 'role', 'phone', 'company']
    
# # # #     def create(self, validated_data):
# # # #         role = validated_data.pop('role')
# # # #         phone = validated_data.pop('phone')
# # # #         company_name = validated_data.pop('company')
        
# # # #         user = User.objects.create_user(
# # # #             username=validated_data['username'],
# # # #             password=validated_data['password'],
# # # #             email=validated_data['email'],
# # # #             first_name=validated_data['first_name'],
# # # #             last_name=validated_data['last_name']
# # # #         )
        
# # # #         # Get or create company
# # # #         company, created = Company.objects.get_or_create(
# # # #             name=company_name,
# # # #             defaults={
# # # #                 'address': '',
# # # #                 'phone': '',
# # # #                 'email': ''
# # # #             }
# # # #         )
        
# # # #         UserProfile.objects.create(
# # # #             user=user,
# # # #             role=role,
# # # #             phone=phone,
# # # #             company=company
# # # #         )
        
# # # #         # If role is employee, create Employee record
# # # #         if role == 'employee':
# # # #             from datetime import date
# # # #             import uuid
# # # #             Employee.objects.create(
# # # #                 user=user,
# # # #                 employee_id=str(uuid.uuid4())[:8],
# # # #                 phone=phone,
# # # #                 designation='Employee',
# # # #                 joining_date=date.today(),
# # # #                 company=company,
# # # #                 is_active=True
# # # #             )
        
# # # #         return user

# # # # class EmployeeCreateSerializer(serializers.Serializer):
# # # #     username = serializers.CharField()
# # # #     password = serializers.CharField()
# # # #     email = serializers.EmailField()
# # # #     first_name = serializers.CharField()
# # # #     last_name = serializers.CharField()
# # # #     employee_id = serializers.CharField()
# # # #     phone = serializers.CharField()
# # # #     designation = serializers.CharField()
# # # #     joining_date = serializers.DateField()
# # # #     is_active = serializers.BooleanField(default=True)
    
# # # #     def create(self, validated_data):
# # # #         # Get the company from the request user
# # # #         request = self.context.get('request')
# # # #         user_profile = UserProfile.objects.get(user=request.user)
# # # #         company = user_profile.company
        
# # # #         # Create user
# # # #         user = User.objects.create_user(
# # # #             username=validated_data['username'],
# # # #             password=validated_data['password'],
# # # #             email=validated_data['email'],
# # # #             first_name=validated_data['first_name'],
# # # #             last_name=validated_data['last_name']
# # # #         )
        
# # # #         # Create user profile
# # # #         UserProfile.objects.create(
# # # #             user=user,
# # # #             role='employee',
# # # #             phone=validated_data['phone'],
# # # #             company=company
# # # #         )
        
# # # #         # Create employee
# # # #         employee = Employee.objects.create(
# # # #             user=user,
# # # #             employee_id=validated_data['employee_id'],
# # # #             phone=validated_data['phone'],
# # # #             designation=validated_data['designation'],
# # # #             joining_date=validated_data['joining_date'],
# # # #             company=company,
# # # #             is_active=validated_data['is_active']
# # # #         )
        
# # # #         return employee

# # # # your_app/serializers.py
# # # from rest_framework import serializers
# # # from django.contrib.auth.models import User
# # # from django.contrib.auth.hashers import make_password
# # # from .models import (
# # #     Company, UserProfile, Employee, Organization, 
# # #     Doctor, Product, Visit, Attendance, Schedule, LeaveRequest
# # # )

# # # class UserSerializer(serializers.ModelSerializer):
# # #     class Meta:
# # #         model = User
# # #         fields = ['id', 'username', 'email', 'first_name', 'last_name']

# # # class UserProfileSerializer(serializers.ModelSerializer):
# # #     user = UserSerializer(read_only=True)
# # #     company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    
# # #     class Meta:
# # #         model = UserProfile
# # #         fields = ['user', 'role', 'company', 'phone']

# # # class CompanySerializer(serializers.ModelSerializer):
# # #     class Meta:
# # #         model = Company
# # #         fields = '__all__'

# # # class EmployeeSerializer(serializers.ModelSerializer):
# # #     user = UserSerializer(read_only=True)
# # #     company_name = serializers.CharField(source='company.name', read_only=True)
    
# # #     class Meta:
# # #         model = Employee
# # #         fields = ['id', 'user', 'employee_id', 'phone', 'designation', 
# # #                  'joining_date', 'company', 'company_name', 'is_active']

# # # class OrganizationSerializer(serializers.ModelSerializer):
# # #     class Meta:
# # #         model = Organization
# # #         fields = ['id', 'name', 'address', 'phone', 'email', 'type', 'company', 'created_at']
# # #         extra_kwargs = {
# # #             'company': {'required': False, 'allow_null': True},
# # #         }

# # # class DoctorSerializer(serializers.ModelSerializer):
# # #     organization_name = serializers.CharField(source='organization.name', read_only=True)
    
# # #     class Meta:
# # #         model = Doctor
# # #         fields = ['id', 'name', 'specialization', 'phone', 'email', 
# # #                  'organization', 'organization_name', 'created_at']

# # # class ProductSerializer(serializers.ModelSerializer):
# # #     class Meta:
# # #         model = Product
# # #         fields = ['id', 'name', 'description', 'category', 'price', 'company', 'is_active', 'created_at']
# # #         extra_kwargs = {
# # #             'company': {'required': False, 'allow_null': True},
# # #         }

# # # class VisitSerializer(serializers.ModelSerializer):
# # #     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
# # #     doctor_name = serializers.CharField(source='doctor.name', read_only=True)
# # #     organization_name = serializers.CharField(source='organization.name', read_only=True)
# # #     product_names = serializers.SerializerMethodField()
    
# # #     class Meta:
# # #         model = Visit
# # #         fields = '__all__'
    
# # #     def get_product_names(self, obj):
# # #         return [product.name for product in obj.products.all()]

# # # class AttendanceSerializer(serializers.ModelSerializer):
# # #     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
    
# # #     class Meta:
# # #         model = Attendance
# # #         fields = '__all__'

# # # class LeaveRequestSerializer(serializers.ModelSerializer):
# # #     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
# # #     approved_by_name = serializers.CharField(source='approved_by.first_name', read_only=True)
    
# # #     class Meta:
# # #         model = LeaveRequest
# # #         fields = '__all__'

# # # class ScheduleSerializer(serializers.ModelSerializer):
# # #     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
    
# # #     class Meta:
# # #         model = Schedule
# # #         fields = '__all__'

# # # class UserRegistrationSerializer(serializers.ModelSerializer):
# # #     password = serializers.CharField(write_only=True)
# # #     role = serializers.CharField()
# # #     phone = serializers.CharField()
# # #     company = serializers.CharField()
    
# # #     class Meta:
# # #         model = User
# # #         fields = ['username', 'password', 'email', 'first_name', 'last_name', 'role', 'phone', 'company']
    
# # #     def create(self, validated_data):
# # #         role = validated_data.pop('role')
# # #         phone = validated_data.pop('phone')
# # #         company_name = validated_data.pop('company')
        
# # #         user = User.objects.create_user(
# # #             username=validated_data['username'],
# # #             password=validated_data['password'],
# # #             email=validated_data['email'],
# # #             first_name=validated_data['first_name'],
# # #             last_name=validated_data['last_name']
# # #         )
        
# # #         company, created = Company.objects.get_or_create(
# # #             name=company_name,
# # #             defaults={'address': '', 'phone': '', 'email': ''}
# # #         )
        
# # #         UserProfile.objects.create(
# # #             user=user,
# # #             role=role,
# # #             phone=phone,
# # #             company=company
# # #         )
        
# # #         if role == 'employee':
# # #             from datetime import date
# # #             import uuid
# # #             Employee.objects.create(
# # #                 user=user,
# # #                 employee_id=str(uuid.uuid4())[:8],
# # #                 phone=phone,
# # #                 designation='Employee',
# # #                 joining_date=date.today(),
# # #                 company=company,
# # #                 is_active=True
# # #             )
        
# # #         return user

# # # class EmployeeCreateSerializer(serializers.Serializer):
# # #     username = serializers.CharField()
# # #     password = serializers.CharField()
# # #     email = serializers.EmailField()
# # #     first_name = serializers.CharField()
# # #     last_name = serializers.CharField()
# # #     employee_id = serializers.CharField()
# # #     phone = serializers.CharField()
# # #     designation = serializers.CharField()
# # #     joining_date = serializers.DateField()
# # #     is_active = serializers.BooleanField(default=True)
    
# # #     def create(self, validated_data):
# # #         request = self.context.get('request')
# # #         user_profile = UserProfile.objects.get(user=request.user)
# # #         company = user_profile.company
        
# # #         user = User.objects.create_user(
# # #             username=validated_data['username'],
# # #             password=validated_data['password'],
# # #             email=validated_data['email'],
# # #             first_name=validated_data['first_name'],
# # #             last_name=validated_data['last_name']
# # #         )
        
# # #         UserProfile.objects.create(
# # #             user=user,
# # #             role='employee',
# # #             phone=validated_data['phone'],
# # #             company=company
# # #         )
        
# # #         employee = Employee.objects.create(
# # #             user=user,
# # #             employee_id=validated_data['employee_id'],
# # #             phone=validated_data['phone'],
# # #             designation=validated_data['designation'],
# # #             joining_date=validated_data['joining_date'],
# # #             company=company,
# # #             is_active=validated_data['is_active']
# # #         )
        
# # #         return employee


# # from rest_framework import serializers
# # from django.contrib.auth.models import User
# # from django.contrib.auth.hashers import make_password
# # from .models import (
# #     Department, Company, Employee, Organization, 
# #     Doctor, Product, Visit, Attendance, Schedule, LeaveRequest
# # )

# # class UserSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = User
# #         fields = ['id', 'username', 'email', 'first_name', 'last_name']

# # class UserProfileSerializer(serializers.ModelSerializer):
# #     user = UserSerializer(read_only=True)
# #     company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    
# #     class Meta:
# #         model = UserProfile
# #         fields = ['user', 'role', 'company', 'phone']

# # class CompanySerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Company
# #         fields = '__all__'

# # class EmployeeSerializer(serializers.ModelSerializer):
# #     user = UserSerializer(read_only=True)
# #     company_name = serializers.CharField(source='company.name', read_only=True)
    
# #     class Meta:
# #         model = Employee
# #         fields = ['id', 'user', 'employee_id', 'phone', 'designation', 
# #                  'joining_date', 'company', 'company_name', 'is_active']

# # class DoctorSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Doctor
# #         fields = ['id', 'name', 'specialization', 'phone', 'email', 'created_at']

# # class OrganizationSerializer(serializers.ModelSerializer):
# #     doctors = DoctorSerializer(many=True, read_only=True)
# #     doctor_ids = serializers.PrimaryKeyRelatedField(
# #         queryset=Doctor.objects.all(), many=True, source='doctors', write_only=True, required=False
# #     )
    
# #     class Meta:
# #         model = Organization
# #         fields = ['id', 'name', 'address', 'phone', 'email', 'type', 'company', 'doctors', 'doctor_ids', 'created_at']
# #         extra_kwargs = {
# #             'company': {'required': False, 'allow_null': True},
# #         }

# # class ProductSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Product
# #         fields = ['id', 'name', 'description', 'category', 'price', 'company', 'is_active', 'created_at']
# #         extra_kwargs = {
# #             'company': {'required': False, 'allow_null': True},
# #         }

# # class VisitSerializer(serializers.ModelSerializer):
# #     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
# #     doctor_name = serializers.CharField(source='doctor.name', read_only=True)
# #     organization_name = serializers.CharField(source='organization.name', read_only=True)
# #     product_names = serializers.SerializerMethodField()
    
# #     class Meta:
# #         model = Visit
# #         fields = '__all__'
    
# #     def get_product_names(self, obj):
# #         return [product.name for product in obj.products.all()]

# # class AttendanceSerializer(serializers.ModelSerializer):
# #     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
    
# #     class Meta:
# #         model = Attendance
# #         fields = '__all__'

# # class LeaveRequestSerializer(serializers.ModelSerializer):
# #     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
# #     approved_by_name = serializers.CharField(source='approved_by.first_name', read_only=True)
    
# #     class Meta:
# #         model = LeaveRequest
# #         fields = '__all__'

# # class ScheduleSerializer(serializers.ModelSerializer):
# #     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
    
# #     class Meta:
# #         model = Schedule
# #         fields = '__all__'

# # class UserRegistrationSerializer(serializers.ModelSerializer):
# #     password = serializers.CharField(write_only=True)
# #     role = serializers.CharField()
# #     phone = serializers.CharField()
# #     company = serializers.CharField()
    
# #     class Meta:
# #         model = User
# #         fields = ['username', 'password', 'email', 'first_name', 'last_name', 'role', 'phone', 'company']
    
# #     def create(self, validated_data):
# #         role = validated_data.pop('role')
# #         phone = validated_data.pop('phone')
# #         company_name = validated_data.pop('company')
        
# #         user = User.objects.create_user(
# #             username=validated_data['username'],
# #             password=validated_data['password'],
# #             email=validated_data['email'],
# #             first_name=validated_data['first_name'],
# #             last_name=validated_data['last_name']
# #         )
        
# #         company, created = Company.objects.get_or_create(
# #             name=company_name,
# #             defaults={'address': '', 'phone': '', 'email': ''}
# #         )
        
# #         UserProfile.objects.create(
# #             user=user,
# #             role=role,
# #             phone=phone,
# #             company=company
# #         )
        
# #         if role == 'employee':
# #             from datetime import date
# #             import uuid
# #             Employee.objects.create(
# #                 user=user,
# #                 employee_id=str(uuid.uuid4())[:8],
# #                 phone=phone,
# #                 designation='Employee',
# #                 joining_date=date.today(),
# #                 company=company,
# #                 is_active=True
# #             )
        
# #         return user

# # class EmployeeCreateSerializer(serializers.Serializer):
# #     username = serializers.CharField()
# #     password = serializers.CharField()
# #     email = serializers.EmailField()
# #     first_name = serializers.CharField()
# #     last_name = serializers.CharField()
# #     employee_id = serializers.CharField()
# #     phone = serializers.CharField()
# #     designation = serializers.CharField()
# #     joining_date = serializers.DateField()
# #     is_active = serializers.BooleanField(default=True)
    
# #     def create(self, validated_data):
# #         request = self.context.get('request')
# #         user_profile = UserProfile.objects.get(user=request.user)
# #         company = user_profile.company
        
# #         user = User.objects.create_user(
# #             username=validated_data['username'],
# #             password=validated_data['password'],
# #             email=validated_data['email'],
# #             first_name=validated_data['first_name'],
# #             last_name=validated_data['last_name']
# #         )
        
# #         UserProfile.objects.create(
# #             user=user,
# #             role='employee',
# #             phone=validated_data['phone'],
# #             company=company
# #         )
        
# #         employee = Employee.objects.create(
# #             user=user,
# #             employee_id=validated_data['employee_id'],
# #             phone=validated_data['phone'],
# #             designation=validated_data['designation'],
# #             joining_date=validated_data['joining_date'],
# #             company=company,
# #             is_active=validated_data['is_active']
# #         )
        
# #         return employee


# from rest_framework import serializers
# from django.contrib.auth.models import User
# from django.contrib.auth.hashers import make_password
# from .models import (
#     Company, Employee, Organization, 
#     Doctor, Product, Visit, Attendance, Schedule, LeaveRequest, UserProfile
# )

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'first_name', 'last_name']

# class UserProfileSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)
#     company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    
#     class Meta:
#         model = UserProfile
#         fields = ['user', 'role', 'company', 'phone']

# class CompanySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Company
#         fields = '__all__'

# class EmployeeSerializer(serializers.ModelSerializer):
#     user = UserSerializer(read_only=True)
#     company_name = serializers.CharField(source='company.name', read_only=True)
    
#     class Meta:
#         model = Employee
#         fields = ['id', 'user', 'employee_id', 'phone', 'designation', 
#                  'joining_date', 'company', 'company_name', 'is_active']

# class DoctorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Doctor
#         fields = ['id', 'name', 'specialization', 'phone', 'email', 'created_at']

# class OrganizationSerializer(serializers.ModelSerializer):
#     doctors = DoctorSerializer(many=True, read_only=True)
#     doctor_ids = serializers.PrimaryKeyRelatedField(
#         queryset=Doctor.objects.all(), many=True, source='doctors', write_only=True, required=False
#     )
    
#     class Meta:
#         model = Organization
#         fields = ['id', 'name', 'address', 'phone', 'email', 'type', 'company', 'doctors', 'doctor_ids', 'created_at']
#         extra_kwargs = {
#             'company': {'required': False, 'allow_null': True},
#         }

# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ['id', 'name', 'description', 'category', 'price', 'company', 'is_active', 'created_at']
#         extra_kwargs = {
#             'company': {'required': False, 'allow_null': True},
#         }

# # class VisitSerializer(serializers.ModelSerializer):
# #     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
# #     doctor_name = serializers.CharField(source='doctor.name', read_only=True)
# #     organization_name = serializers.CharField(source='organization.name', read_only=True)
# #     product_names = serializers.SerializerMethodField()
    
# #     class Meta:
# #         model = Visit
# #         fields = '__all__'
    
# #     def get_product_names(self, obj):
# #         return [product.name for product in obj.products.all()]

# class VisitSerializer(serializers.ModelSerializer):
#     doctor_name = serializers.CharField(source='doctor.name', read_only=True)
#     organization_name = serializers.CharField(source='organization.name', read_only=True)
#     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)  # Fixed source
#     products = ProductSerializer(many=True, read_only=True)
#     product_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)

#     class Meta:
#         model = Visit
#         fields = [
#             'id', 'employee', 'employee_name', 'doctor', 'doctor_name', 'organization',
#             'organization_name', 'visit_date', 'visit_time', 'duration', 'products',
#             'product_ids', 'notes', 'status', 'created_at', 'updated_at'
#         ]
#         read_only_fields = ['id', 'employee_name', 'doctor_name', 'organization_name', 'created_at', 'updated_at']

#     def validate_employee(self, value):
#         if not Employee.objects.filter(id=value).exists():
#             raise serializers.ValidationError(f'Invalid employee ID "{value}" - object does not exist.')
#         return value

#     def validate_doctor(self, value):
#         if not Doctor.objects.filter(id=value).exists():
#             raise serializers.ValidationError(f'Invalid doctor ID "{value}" - object does not exist.')
#         return value

#     def validate_organization(self, value):
#         if not Organization.objects.filter(id=value).exists():
#             raise serializers.ValidationError(f'Invalid organization ID "{value}" - object does not exist.')
#         return value

#     def validate_product_ids(self, value):
#         if value:
#             for product_id in value:
#                 if not Product.objects.filter(id=product_id).exists():
#                     raise serializers.ValidationError(f'Invalid product ID "{product_id}" - object does not exist.')
#         return value

#     def create(self, validated_data):
#         product_ids = validated_data.pop('product_ids', [])
#         visit = Visit.objects.create(**validated_data)
#         if product_ids:
#             visit.products.set(product_ids)
#         return visit

#     def update(self, instance, validated_data):
#         product_ids = validated_data.pop('product_ids', None)
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.save()
#         if product_ids is not None:
#             instance.products.set(product_ids)
#         return instance

# class AttendanceSerializer(serializers.ModelSerializer):
#     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
    
#     class Meta:
#         model = Attendance
#         fields = '__all__'

# class LeaveRequestSerializer(serializers.ModelSerializer):
#     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
#     approved_by_name = serializers.CharField(source='approved_by.first_name', read_only=True)
    
#     class Meta:
#         model = LeaveRequest
#         fields = '__all__'

# class ScheduleSerializer(serializers.ModelSerializer):
#     employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
    
#     class Meta:
#         model = Schedule
#         fields = '__all__'

# class UserRegistrationSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)
#     role = serializers.CharField()
#     phone = serializers.CharField()
#     company = serializers.CharField()
    
#     class Meta:
#         model = User
#         fields = ['username', 'password', 'email', 'first_name', 'last_name', 'role', 'phone', 'company']
    
#     def create(self, validated_data):
#         role = validated_data.pop('role')
#         phone = validated_data.pop('phone')
#         company_name = validated_data.pop('company')
        
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             password=validated_data['password'],
#             email=validated_data['email'],
#             first_name=validated_data['first_name'],
#             last_name=validated_data['last_name']
#         )
        
#         company, created = Company.objects.get_or_create(
#             name=company_name,
#             defaults={'address': '', 'phone': '', 'email': ''}
#         )
        
#         UserProfile.objects.create(
#             user=user,
#             role=role,
#             phone=phone,
#             company=company
#         )
        
#         if role == 'employee':
#             from datetime import date
#             import uuid
#             Employee.objects.create(
#                 user=user,
#                 employee_id=str(uuid.uuid4())[:8],
#                 phone=phone,
#                 designation='Employee',
#                 joining_date=date.today(),
#                 company=company,
#                 is_active=True
#             )
        
#         return user

# class EmployeeCreateSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()
#     email = serializers.EmailField()
#     first_name = serializers.CharField()
#     last_name = serializers.CharField()
#     employee_id = serializers.CharField()
#     phone = serializers.CharField()
#     designation = serializers.CharField()
#     joining_date = serializers.DateField()
#     is_active = serializers.BooleanField(default=True)
    
#     def create(self, validated_data):
#         request = self.context.get('request')
#         user_profile = UserProfile.objects.get(user=request.user)
#         company = user_profile.company
        
#         user = User.objects.create_user(
#             username=validated_data['username'],
#             password=validated_data['password'],
#             email=validated_data['email'],
#             first_name=validated_data['first_name'],
#             last_name=validated_data['last_name']
#         )
        
#         UserProfile.objects.create(
#             user=user,
#             role='employee',
#             phone=validated_data['phone'],
#             company=company
#         )
        
#         employee = Employee.objects.create(
#             user=user,
#             employee_id=validated_data['employee_id'],
#             phone=validated_data['phone'],
#             designation=validated_data['designation'],
#             joining_date=validated_data['joining_date'],
#             company=company,
#             is_active=validated_data['is_active']
#         )
        
#         return employee

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Company, Employee, Organization, 
    Doctor, Product, Visit, Attendance, Schedule, LeaveRequest, UserProfile
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    
    class Meta:
        model = UserProfile
        fields = ['user', 'role', 'company', 'phone']

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    company_name = serializers.CharField(source='company.name', read_only=True)
    
    class Meta:
        model = Employee
        fields = ['id', 'user', 'employee_id', 'phone', 'designation', 
                 'joining_date', 'company', 'company_name', 'is_active']

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'specialization', 'phone', 'email', 'created_at']

class OrganizationSerializer(serializers.ModelSerializer):
    doctors = DoctorSerializer(many=True, read_only=True)
    doctor_ids = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(), many=True, source='doctors', write_only=True, required=False
    )
    
    class Meta:
        model = Organization
        fields = ['id', 'name', 'address', 'phone', 'email', 'type', 'company', 'doctors', 'doctor_ids', 'created_at']
        extra_kwargs = {
            'company': {'required': False, 'allow_null': True},
        }

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'price', 'company', 'is_active', 'created_at']
        extra_kwargs = {
            'company': {'required': False, 'allow_null': True},
        }

class VisitSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)
    organization_name = serializers.CharField(source='organization.name', read_only=True)
    employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
    products = ProductSerializer(many=True, read_only=True)
    product_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)

    class Meta:
        model = Visit
        fields = [
            'id', 'employee', 'employee_name', 'doctor', 'doctor_name', 'organization',
            'organization_name', 'visit_date', 'visit_time', 'duration', 'products',
            'product_ids', 'notes', 'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'employee_name', 'doctor_name', 'organization_name', 'created_at', 'updated_at']

    def validate_employee(self, value):
        if not isinstance(value, int):
            raise serializers.ValidationError(f'Employee ID must be an integer, got {type(value)}: {value}')
        if not Employee.objects.filter(id=value).exists():
            raise serializers.ValidationError(f'Invalid employee ID "{value}" - object does not exist.')
        return value

    def validate_doctor(self, value):
        if not isinstance(value, int):
            raise serializers.ValidationError(f'Doctor ID must be an integer, got {type(value)}: {value}')
        if not Doctor.objects.filter(id=value).exists():
            raise serializers.ValidationError(f'Invalid doctor ID "{value}" - object does not exist.')
        return value

    def validate_organization(self, value):
        if not isinstance(value, int):
            raise serializers.ValidationError(f'Organization ID must be an integer, got {type(value)}: {value}')
        if not Organization.objects.filter(id=value).exists():
            raise serializers.ValidationError(f'Invalid organization ID "{value}" - object does not exist.')
        return value

    def validate_product_ids(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError(f'Product IDs must be a list, got {type(value)}: {value}')
        for product_id in value:
            if not isinstance(product_id, int):
                raise serializers.ValidationError(f'Product ID must be an integer, got {type(product_id)}: {product_id}')
            if not Product.objects.filter(id=product_id).exists():
                raise serializers.ValidationError(f'Invalid product ID "{product_id}" - object does not exist.')
        return value

    def validate(self, data):
        # Ensure visit_time is in HH:MM:SS format
        if isinstance(data.get('visit_time'), str):
            try:
                # If visit_time is HH:MM, append :00 for seconds
                if len(data['visit_time'].split(':')) == 2:
                    data['visit_time'] = f"{data['visit_time']}:00"
            except ValueError:
                raise serializers.ValidationError({'visit_time': 'Invalid time format. Use HH:MM or HH:MM:SS'})
        return data

    def create(self, validated_data):
        product_ids = validated_data.pop('product_ids', [])
        try:
            visit = Visit.objects.create(**validated_data)
            if product_ids:
                visit.products.set(product_ids)
            return visit
        except Exception as e:
            raise serializers.ValidationError(f"Error creating visit: {str(e)}")

    def update(self, instance, validated_data):
        product_ids = validated_data.pop('product_ids', None)
        try:
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
            if product_ids is not None:
                instance.products.set(product_ids)
            return instance
        except Exception as e:
            raise serializers.ValidationError(f"Error updating visit: {str(e)}")

class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
    
    class Meta:
        model = Attendance
        fields = '__all__'

class LeaveRequestSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
    approved_by_name = serializers.CharField(source='approved_by.first_name', read_only=True)
    
    class Meta:
        model = LeaveRequest
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.user.first_name', read_only=True)
    
    class Meta:
        model = Schedule
        fields = '__all__'

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.CharField()
    phone = serializers.CharField()
    company = serializers.CharField()
    
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name', 'role', 'phone', 'company']
    
    def create(self, validated_data):
        role = validated_data.pop('role')
        phone = validated_data.pop('phone')
        company_name = validated_data.pop('company')
        
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        company, created = Company.objects.get_or_create(
            name=company_name,
            defaults={'address': '', 'phone': '', 'email': ''}
        )
        
        UserProfile.objects.create(
            user=user,
            role=role,
            phone=phone,
            company=company
        )
        
        if role == 'employee':
            from datetime import date
            import uuid
            Employee.objects.create(
                user=user,
                employee_id=str(uuid.uuid4())[:8],
                phone=phone,
                designation='Employee',
                joining_date=date.today(),
                company=company,
                is_active=True
            )
        
        return user

class EmployeeCreateSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    employee_id = serializers.CharField()
    phone = serializers.CharField()
    designation = serializers.CharField()
    joining_date = serializers.DateField()
    is_active = serializers.BooleanField(default=True)
    
    def create(self, validated_data):
        request = self.context.get('request')
        user_profile = UserProfile.objects.get(user=request.user)
        company = user_profile.company
        
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        UserProfile.objects.create(
            user=user,
            role='employee',
            phone=validated_data['phone'],
            company=company
        )
        
        employee = Employee.objects.create(
            user=user,
            employee_id=validated_data['employee_id'],
            phone=validated_data['phone'],
            designation=validated_data['designation'],
            joining_date=validated_data['joining_date'],
            company=company,
            is_active=validated_data['is_active']
        )
        
        return employee