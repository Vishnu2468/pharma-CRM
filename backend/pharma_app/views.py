# # # # from rest_framework import generics, status, permissions
# # # # from rest_framework.decorators import api_view, permission_classes
# # # # from rest_framework.response import Response
# # # # from rest_framework_simplejwt.tokens import RefreshToken
# # # # from django.contrib.auth import authenticate
# # # # from django.contrib.auth.models import User
# # # # from django.utils import timezone
# # # # from datetime import date, datetime
# # # # from django.db import transaction

# # # # from .models import (
# # # #     Company, UserProfile, Employee, Organization, 
# # # #     Doctor, Product, Visit, Attendance, Schedule, LeaveRequest
# # # # )
# # # # from .serializers import (
# # # #     UserSerializer, UserProfileSerializer, CompanySerializer,
# # # #     EmployeeSerializer, OrganizationSerializer, DoctorSerializer,
# # # #     ProductSerializer, VisitSerializer, AttendanceSerializer,
# # # #     ScheduleSerializer, UserRegistrationSerializer, EmployeeCreateSerializer,
# # # #     LeaveRequestSerializer
# # # # )

# # # # @api_view(['POST'])
# # # # @permission_classes([permissions.AllowAny])
# # # # def login_view(request):
# # # #     try:
# # # #         username = request.data.get('username')
# # # #         password = request.data.get('password')
        
# # # #         if not username or not password:
# # # #             return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
# # # #         user = authenticate(username=username, password=password)
# # # #         if user:
# # # #             refresh = RefreshToken.for_user(user)
# # # #             try:
# # # #                 profile = UserProfile.objects.get(user=user)
# # # #                 user_data = {
# # # #                     'id': user.id,
# # # #                     'username': user.username,
# # # #                     'email': user.email,
# # # #                     'first_name': user.first_name,
# # # #                     'last_name': user.last_name,
# # # #                     'role': profile.role,
# # # #                     'company': profile.company.id if profile.company else None
# # # #                 }
# # # #             except UserProfile.DoesNotExist:
# # # #                 user_data = {
# # # #                     'id': user.id,
# # # #                     'username': user.username,
# # # #                     'email': user.email,
# # # #                     'first_name': user.first_name,
# # # #                     'last_name': user.last_name,
# # # #                     'role': 'employee',
# # # #                     'company': None
# # # #                 }
            
# # # #             return Response({
# # # #                 'access': str(refresh.access_token),
# # # #                 'refresh': str(refresh),
# # # #                 'user': user_data
# # # #             })
        
# # # #         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
# # # #     except Exception as e:
# # # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # # @api_view(['POST'])
# # # # @permission_classes([permissions.AllowAny])
# # # # def signup_view(request):
# # # #     try:
# # # #         serializer = UserRegistrationSerializer(data=request.data)
# # # #         if serializer.is_valid():
# # # #             user = serializer.save()
# # # #             refresh = RefreshToken.for_user(user)
# # # #             profile = UserProfile.objects.get(user=user)
            
# # # #             user_data = {
# # # #                 'id': user.id,
# # # #                 'username': user.username,
# # # #                 'email': user.email,
# # # #                 'first_name': user.first_name,
# # # #                 'last_name': user.last_name,
# # # #                 'role': profile.role,
# # # #                 'company': profile.company.id if profile.company else None
# # # #             }
            
# # # #             return Response({
# # # #                 'access': str(refresh.access_token),
# # # #                 'refresh': str(refresh),
# # # #                 'user': user_data
# # # #             }, status=status.HTTP_201_CREATED)
        
# # # #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# # # #     except Exception as e:
# # # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # # # Company Views
# # # # class CompanyListCreateView(generics.ListCreateAPIView):
# # # #     queryset = Company.objects.all()
# # # #     serializer_class = CompanySerializer

# # # # # Employee Views
# # # # class EmployeeListCreateView(generics.ListCreateAPIView):
# # # #     serializer_class = EmployeeSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.role == 'owner' and user_profile.company:
# # # #                 return Employee.objects.filter(company=user_profile.company)
# # # #             elif user_profile.role == 'employee':
# # # #                 return Employee.objects.filter(user=self.request.user)
# # # #             return Employee.objects.none()
# # # #         except UserProfile.DoesNotExist:
# # # #             return Employee.objects.none()

# # # # @api_view(['POST'])
# # # # def create_employee(request):
# # # #     try:
# # # #         user_profile = UserProfile.objects.get(user=request.user)
# # # #         if user_profile.role != 'owner':
# # # #             return Response({'error': 'Only company owners can create employees'}, status=status.HTTP_403_FORBIDDEN)
        
# # # #         serializer = EmployeeCreateSerializer(data=request.data, context={'request': request})
# # # #         if serializer.is_valid():
# # # #             employee = serializer.save()
# # # #             return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
        
# # # #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# # # #     except UserProfile.DoesNotExist:
# # # #         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
# # # #     except Exception as e:
# # # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # # # Organization Views
# # # # class OrganizationListCreateView(generics.ListCreateAPIView):
# # # #     serializer_class = OrganizationSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.company:
# # # #                 return Organization.objects.filter(company=user_profile.company)
# # # #             return Organization.objects.all()
# # # #         except UserProfile.DoesNotExist:
# # # #             return Organization.objects.all()
    
# # # #     def perform_create(self, serializer):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.company:
# # # #                 serializer.save(company=user_profile.company)
# # # #             else:
# # # #                 serializer.save()
# # # #         except UserProfile.DoesNotExist:
# # # #             serializer.save()

# # # # class OrganizationDetailView(generics.RetrieveUpdateDestroyAPIView):
# # # #     serializer_class = OrganizationSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.company:
# # # #                 return Organization.objects.filter(company=user_profile.company)
# # # #             return Organization.objects.all()
# # # #         except UserProfile.DoesNotExist:
# # # #             return Organization.objects.all()

# # # # # Doctor Views
# # # # class DoctorListCreateView(generics.ListCreateAPIView):
# # # #     serializer_class = DoctorSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.company:
# # # #                 return Doctor.objects.filter(organization__company=user_profile.company)
# # # #             return Doctor.objects.all()
# # # #         except UserProfile.DoesNotExist:
# # # #             return Doctor.objects.all()

# # # # class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):
# # # #     serializer_class = DoctorSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.company:
# # # #                 return Doctor.objects.filter(organization__company=user_profile.company)
# # # #             return Doctor.objects.all()
# # # #         except UserProfile.DoesNotExist:
# # # #             return Doctor.objects.all()

# # # # # Product Views
# # # # class ProductListCreateView(generics.ListCreateAPIView):
# # # #     serializer_class = ProductSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.company:
# # # #                 return Product.objects.filter(company=user_profile.company, is_active=True)
# # # #             return Product.objects.filter(is_active=True)
# # # #         except UserProfile.DoesNotExist:
# # # #             return Product.objects.filter(is_active=True)
    
# # # #     def perform_create(self, serializer):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.company:
# # # #                 serializer.save(company=user_profile.company)
# # # #             else:
# # # #                 serializer.save()
# # # #         except UserProfile.DoesNotExist:
# # # #             serializer.save()

# # # # class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
# # # #     serializer_class = ProductSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.company:
# # # #                 return Product.objects.filter(company=user_profile.company)
# # # #             return Product.objects.all()
# # # #         except UserProfile.DoesNotExist:
# # # #             return Product.objects.all()

# # # # # Visit Views
# # # # class VisitListCreateView(generics.ListCreateAPIView):
# # # #     serializer_class = VisitSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.role == 'employee':
# # # #                 try:
# # # #                     employee = Employee.objects.get(user=self.request.user)
# # # #                     return Visit.objects.filter(employee=employee)
# # # #                 except Employee.DoesNotExist:
# # # #                     return Visit.objects.none()
# # # #             elif user_profile.role == 'owner' and user_profile.company:
# # # #                 return Visit.objects.filter(employee__company=user_profile.company)
# # # #             return Visit.objects.all()
# # # #         except UserProfile.DoesNotExist:
# # # #             return Visit.objects.all()
    
# # # #     def perform_create(self, serializer):
# # # #         try:
# # # #             employee = Employee.objects.get(user=self.request.user)
# # # #             serializer.save(employee=employee)
# # # #         except Employee.DoesNotExist:
# # # #             raise serializers.ValidationError("Employee profile not found")

# # # # class VisitDetailView(generics.RetrieveUpdateDestroyAPIView):
# # # #     serializer_class = VisitSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.role == 'employee':
# # # #                 try:
# # # #                     employee = Employee.objects.get(user=self.request.user)
# # # #                     return Visit.objects.filter(employee=employee)
# # # #                 except Employee.DoesNotExist:
# # # #                     return Visit.objects.none()
# # # #             elif user_profile.role == 'owner' and user_profile.company:
# # # #                 return Visit.objects.filter(employee__company=user_profile.company)
# # # #             return Visit.objects.all()
# # # #         except UserProfile.DoesNotExist:
# # # #             return Visit.objects.all()

# # # # # Attendance Views
# # # # class AttendanceListCreateView(generics.ListCreateAPIView):
# # # #     serializer_class = AttendanceSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.role == 'employee':
# # # #                 try:
# # # #                     employee = Employee.objects.get(user=self.request.user)
# # # #                     return Attendance.objects.filter(employee=employee)
# # # #                 except Employee.DoesNotExist:
# # # #                     return Attendance.objects.none()
# # # #             elif user_profile.role == 'owner' and user_profile.company:
# # # #                 return Attendance.objects.filter(employee__company=user_profile.company)
# # # #             return Attendance.objects.all()
# # # #         except UserProfile.DoesNotExist:
# # # #             return Attendance.objects.all()

# # # # @api_view(['POST'])
# # # # def mark_attendance(request):
# # # #     try:
# # # #         employee = Employee.objects.get(user=request.user)
# # # #         today = date.today()
# # # #         current_time = timezone.now().time()
        
# # # #         attendance, created = Attendance.objects.get_or_create(
# # # #             employee=employee,
# # # #             date=today,
# # # #             defaults={
# # # #                 'status': 'present', 
# # # #                 'check_in': current_time,
# # # #                 'notes': request.data.get('notes', '')
# # # #             }
# # # #         )
        
# # # #         if not created:
# # # #             if not attendance.check_out:
# # # #                 attendance.check_out = current_time
# # # #                 attendance.save()
# # # #             else:
# # # #                 return Response({'error': 'Attendance already marked for today'}, status=status.HTTP_400_BAD_REQUEST)
        
# # # #         serializer = AttendanceSerializer(attendance)
# # # #         return Response(serializer.data)
    
# # # #     except Employee.DoesNotExist:
# # # #         return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)
# # # #     except Exception as e:
# # # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # # # Leave Request Views
# # # # class LeaveRequestListCreateView(generics.ListCreateAPIView):
# # # #     serializer_class = LeaveRequestSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.role == 'employee':
# # # #                 try:
# # # #                     employee = Employee.objects.get(user=self.request.user)
# # # #                     return LeaveRequest.objects.filter(employee=employee)
# # # #                 except Employee.DoesNotExist:
# # # #                     return LeaveRequest.objects.none()
# # # #             elif user_profile.role == 'owner' and user_profile.company:
# # # #                 return LeaveRequest.objects.filter(employee__company=user_profile.company)
# # # #             return LeaveRequest.objects.all()
# # # #         except UserProfile.DoesNotExist:
# # # #             return LeaveRequest.objects.all()
    
# # # #     def perform_create(self, serializer):
# # # #         try:
# # # #             employee = Employee.objects.get(user=self.request.user)
# # # #             serializer.save(employee=employee)
# # # #         except Employee.DoesNotExist:
# # # #             raise serializers.ValidationError("Employee profile not found")

# # # # @api_view(['POST'])
# # # # def approve_leave(request, leave_id):
# # # #     try:
# # # #         user_profile = UserProfile.objects.get(user=request.user)
# # # #         if user_profile.role != 'owner':
# # # #             return Response({'error': 'Only owners can approve leaves'}, status=status.HTTP_403_FORBIDDEN)
        
# # # #         leave_request = LeaveRequest.objects.get(id=leave_id, employee__company=user_profile.company)
# # # #         action = request.data.get('action')  # 'approve' or 'reject'
# # # #         comments = request.data.get('comments', '')
        
# # # #         if action == 'approve':
# # # #             leave_request.status = 'approved'
# # # #         elif action == 'reject':
# # # #             leave_request.status = 'rejected'
# # # #         else:
# # # #             return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
        
# # # #         leave_request.approved_by = request.user
# # # #         leave_request.approved_date = timezone.now()
# # # #         leave_request.comments = comments
# # # #         leave_request.save()
        
# # # #         serializer = LeaveRequestSerializer(leave_request)
# # # #         return Response(serializer.data)
    
# # # #     except UserProfile.DoesNotExist:
# # # #         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
# # # #     except LeaveRequest.DoesNotExist:
# # # #         return Response({'error': 'Leave request not found'}, status=status.HTTP_404_NOT_FOUND)
# # # #     except Exception as e:
# # # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # # # Schedule Views
# # # # class ScheduleListCreateView(generics.ListCreateAPIView):
# # # #     serializer_class = ScheduleSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.role == 'employee':
# # # #                 try:
# # # #                     employee = Employee.objects.get(user=self.request.user)
# # # #                     return Schedule.objects.filter(employee=employee)
# # # #                 except Employee.DoesNotExist:
# # # #                     return Schedule.objects.none()
# # # #             elif user_profile.role == 'owner' and user_profile.company:
# # # #                 return Schedule.objects.filter(employee__company=user_profile.company)
# # # #             return Schedule.objects.all()
# # # #         except UserProfile.DoesNotExist:
# # # #             return Schedule.objects.all()
    
# # # #     def perform_create(self, serializer):
# # # #         try:
# # # #             employee = Employee.objects.get(user=self.request.user)
# # # #             serializer.save(employee=employee)
# # # #         except Employee.DoesNotExist:
# # # #             raise serializers.ValidationError("Employee profile not found")

# # # # class ScheduleDetailView(generics.RetrieveUpdateDestroyAPIView):
# # # #     serializer_class = ScheduleSerializer
    
# # # #     def get_queryset(self):
# # # #         try:
# # # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # # #             if user_profile.role == 'employee':
# # # #                 try:
# # # #                     employee = Employee.objects.get(user=self.request.user)
# # # #                     return Schedule.objects.filter(employee=employee)
# # # #                 except Employee.DoesNotExist:
# # # #                     return Schedule.objects.none()
# # # #             elif user_profile.role == 'owner' and user_profile.company:
# # # #                 return Schedule.objects.filter(employee__company=user_profile.company)
# # # #             return Schedule.objects.all()
# # # #         except UserProfile.DoesNotExist:
# # # #             return Schedule.objects.all()

# # # # @api_view(['GET'])
# # # # def employee_visits(request, employee_id):
# # # #     try:
# # # #         employee = Employee.objects.get(id=employee_id)
# # # #         visits = Visit.objects.filter(employee=employee)
# # # #         serializer = VisitSerializer(visits, many=True)
# # # #         return Response(serializer.data)
# # # #     except Employee.DoesNotExist:
# # # #         return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)
# # # #     except Exception as e:
# # # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # # @api_view(['GET'])
# # # # def dashboard_stats(request):
# # # #     try:
# # # #         user_profile = UserProfile.objects.get(user=request.user)
        
# # # #         if user_profile.role == 'employee':
# # # #             try:
# # # #                 employee = Employee.objects.get(user=request.user)
# # # #                 visits = Visit.objects.filter(employee=employee)
# # # #                 schedules = Schedule.objects.filter(employee=employee)
# # # #                 attendance = Attendance.objects.filter(employee=employee)
                
# # # #                 stats = {
# # # #                     'total_visits': visits.count(),
# # # #                     'completed_visits': visits.filter(status='completed').count(),
# # # #                     'pending_visits': visits.filter(status='scheduled').count(),
# # # #                     'total_schedules': schedules.count(),
# # # #                     'attendance_rate': 0
# # # #                 }
                
# # # #                 if attendance.count() > 0:
# # # #                     present_days = attendance.filter(status='present').count()
# # # #                     stats['attendance_rate'] = round((present_days / attendance.count()) * 100, 2)
                
# # # #                 return Response(stats)
# # # #             except Employee.DoesNotExist:
# # # #                 return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)
        
# # # #         elif user_profile.role == 'owner' and user_profile.company:
# # # #             employees = Employee.objects.filter(company=user_profile.company)
# # # #             visits = Visit.objects.filter(employee__company=user_profile.company)
# # # #             products = Product.objects.filter(company=user_profile.company)
# # # #             organizations = Organization.objects.filter(company=user_profile.company)
            
# # # #             stats = {
# # # #                 'total_employees': employees.count(),
# # # #                 'total_visits': visits.count(),
# # # #                 'total_products': products.count(),
# # # #                 'total_organizations': organizations.count(),
# # # #                 'completed_visits': visits.filter(status='completed').count(),
# # # #                 'pending_visits': visits.filter(status='scheduled').count()
# # # #             }
            
# # # #             return Response(stats)
        
# # # #         return Response({'error': 'Invalid user role'}, status=status.HTTP_400_BAD_REQUEST)
    
# # # #     except UserProfile.DoesNotExist:
# # # #         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
# # # #     except Exception as e:
# # # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # from rest_framework import generics, status, permissions
# # # from rest_framework.decorators import api_view, permission_classes
# # # from rest_framework.response import Response
# # # from rest_framework_simplejwt.tokens import RefreshToken
# # # from django.contrib.auth import authenticate
# # # from django.contrib.auth.models import User
# # # from django.utils import timezone
# # # from datetime import date
# # # from django.db import transaction

# # # from .models import (
# # #     Company, UserProfile, Employee, Organization, 
# # #     Doctor, Product, Visit, Attendance, Schedule, LeaveRequest
# # # )
# # # from .serializers import (
# # #     UserSerializer, UserProfileSerializer, CompanySerializer,
# # #     EmployeeSerializer, OrganizationSerializer, DoctorSerializer,
# # #     ProductSerializer, VisitSerializer, AttendanceSerializer,
# # #     ScheduleSerializer, UserRegistrationSerializer, EmployeeCreateSerializer,
# # #     LeaveRequestSerializer
# # # )

# # # @api_view(['POST'])
# # # @permission_classes([permissions.AllowAny])
# # # def login_view(request):
# # #     try:
# # #         username = request.data.get('username')
# # #         password = request.data.get('password')
        
# # #         if not username or not password:
# # #             return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
# # #         user = authenticate(username=username, password=password)
# # #         if user:
# # #             refresh = RefreshToken.for_user(user)
# # #             try:
# # #                 profile = UserProfile.objects.get(user=user)
# # #                 user_data = {
# # #                     'id': user.id,
# # #                     'username': user.username,
# # #                     'email': user.email,
# # #                     'first_name': user.first_name,
# # #                     'last_name': user.last_name,
# # #                     'role': profile.role,
# # #                     'company': profile.company.id if profile.company else None
# # #                 }
# # #             except UserProfile.DoesNotExist:
# # #                 user_data = {
# # #                     'id': user.id,
# # #                     'username': user.username,
# # #                     'email': user.email,
# # #                     'first_name': user.first_name,
# # #                     'last_name': user.last_name,
# # #                     'role': 'employee',
# # #                     'company': None
# # #                 }
            
# # #             return Response({
# # #                 'access': str(refresh.access_token),
# # #                 'refresh': str(refresh),
# # #                 'user': user_data
# # #             })
        
# # #         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
# # #     except Exception as e:
# # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # @api_view(['POST'])
# # # @permission_classes([permissions.AllowAny])
# # # def signup_view(request):
# # #     try:
# # #         serializer = UserRegistrationSerializer(data=request.data)
# # #         if serializer.is_valid():
# # #             user = serializer.save()
# # #             refresh = RefreshToken.for_user(user)
# # #             profile = UserProfile.objects.get(user=user)
            
# # #             user_data = {
# # #                 'id': user.id,
# # #                 'username': user.username,
# # #                 'email': user.email,
# # #                 'first_name': user.first_name,
# # #                 'last_name': user.last_name,
# # #                 'role': profile.role,
# # #                 'company': profile.company.id if profile.company else None
# # #             }
            
# # #             return Response({
# # #                 'access': str(refresh.access_token),
# # #                 'refresh': str(refresh),
# # #                 'user': user_data
# # #             }, status=status.HTTP_201_CREATED)
        
# # #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# # #     except Exception as e:
# # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # @api_view(['GET'])
# # # @permission_classes([permissions.IsAuthenticated])
# # # def get_user_profile(request):
# # #     try:
# # #         user_profile = UserProfile.objects.get(user=request.user)
# # #         serializer = UserProfileSerializer(user_profile)
# # #         return Response(serializer.data)
# # #     except UserProfile.DoesNotExist:
# # #         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
# # #     except Exception as e:
# # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # # Company Views
# # # class CompanyListCreateView(generics.ListCreateAPIView):
# # #     queryset = Company.objects.all()
# # #     serializer_class = CompanySerializer
# # #     permission_classes = [permissions.IsAuthenticated]

# # #     def perform_create(self, serializer):
# # #         user_profile = UserProfile.objects.get(user=self.request.user)
# # #         if user_profile.role != 'owner':
# # #             raise serializers.ValidationError("Only company owners can create companies")
# # #         serializer.save()

# # # # Employee Views
# # # class EmployeeListCreateView(generics.ListCreateAPIView):
# # #     serializer_class = EmployeeSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.role == 'owner' and user_profile.company:
# # #                 return Employee.objects.filter(company=user_profile.company)
# # #             elif user_profile.role == 'employee':
# # #                 return Employee.objects.filter(user=self.request.user)
# # #             return Employee.objects.none()
# # #         except UserProfile.DoesNotExist:
# # #             return Employee.objects.none()

# # # @api_view(['POST'])
# # # @permission_classes([permissions.IsAuthenticated])
# # # def create_employee(request):
# # #     try:
# # #         user_profile = UserProfile.objects.get(user=request.user)
# # #         if user_profile.role != 'owner':
# # #             return Response({'error': 'Only company owners can create employees'}, status=status.HTTP_403_FORBIDDEN)
        
# # #         serializer = EmployeeCreateSerializer(data=request.data, context={'request': request})
# # #         if serializer.is_valid():
# # #             employee = serializer.save()
# # #             return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
        
# # #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# # #     except UserProfile.DoesNotExist:
# # #         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
# # #     except Exception as e:
# # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # # Organization Views
# # # class OrganizationListCreateView(generics.ListCreateAPIView):
# # #     serializer_class = OrganizationSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.company:
# # #                 return Organization.objects.filter(company=user_profile.company)
# # #             return Organization.objects.all()
# # #         except UserProfile.DoesNotExist:
# # #             return Organization.objects.all()
    
# # #     def perform_create(self, serializer):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.role != 'owner':
# # #                 raise serializers.ValidationError("Only company owners can create organizations")
# # #             if user_profile.company:
# # #                 serializer.save(company=user_profile.company)
# # #             else:
# # #                 raise serializers.ValidationError("User must be associated with a company")
# # #         except UserProfile.DoesNotExist:
# # #             raise serializers.ValidationError("User profile not found")

# # # class OrganizationDetailView(generics.RetrieveUpdateDestroyAPIView):
# # #     serializer_class = OrganizationSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.company:
# # #                 return Organization.objects.filter(company=user_profile.company)
# # #             return Organization.objects.all()
# # #         except UserProfile.DoesNotExist:
# # #             return Organization.objects.all()

# # # # Doctor Views
# # # class DoctorListCreateView(generics.ListCreateAPIView):
# # #     serializer_class = DoctorSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.company:
# # #                 return Doctor.objects.filter(organization__company=user_profile.company)
# # #             return Doctor.objects.all()
# # #         except UserProfile.DoesNotExist:
# # #             return Doctor.objects.all()

# # # class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):
# # #     serializer_class = DoctorSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.company:
# # #                 return Doctor.objects.filter(organization__company=user_profile.company)
# # #             return Doctor.objects.all()
# # #         except UserProfile.DoesNotExist:
# # #             return Doctor.objects.all()

# # # # Product Views
# # # class ProductListCreateView(generics.ListCreateAPIView):
# # #     serializer_class = ProductSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.company:
# # #                 return Product.objects.filter(company=user_profile.company, is_active=True)
# # #             return Product.objects.filter(is_active=True)
# # #         except UserProfile.DoesNotExist:
# # #             return Product.objects.filter(is_active=True)
    
# # #     def perform_create(self, serializer):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.role != 'owner':
# # #                 raise serializers.ValidationError("Only company owners can create products")
# # #             if user_profile.company:
# # #                 serializer.save(company=user_profile.company)
# # #             else:
# # #                 raise serializers.ValidationError("User must be associated with a company")
# # #         except UserProfile.DoesNotExist:
# # #             raise serializers.ValidationError("User profile not found")

# # # class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
# # #     serializer_class = ProductSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.company:
# # #                 return Product.objects.filter(company=user_profile.company)
# # #             return Product.objects.all()
# # #         except UserProfile.DoesNotExist:
# # #             return Product.objects.all()

# # # # Visit Views
# # # class VisitListCreateView(generics.ListCreateAPIView):
# # #     serializer_class = VisitSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.role == 'employee':
# # #                 try:
# # #                     employee = Employee.objects.get(user=self.request.user)
# # #                     return Visit.objects.filter(employee=employee)
# # #                 except Employee.DoesNotExist:
# # #                     return Visit.objects.none()
# # #             elif user_profile.role == 'owner' and user_profile.company:
# # #                 return Visit.objects.filter(employee__company=user_profile.company)
# # #             return Visit.objects.all()
# # #         except UserProfile.DoesNotExist:
# # #             return Visit.objects.all()
    
# # #     def perform_create(self, serializer):
# # #         try:
# # #             employee = Employee.objects.get(user=self.request.user)
# # #             serializer.save(employee=employee)
# # #         except Employee.DoesNotExist:
# # #             raise serializers.ValidationError("Employee profile not found")

# # # class VisitDetailView(generics.RetrieveUpdateDestroyAPIView):
# # #     serializer_class = VisitSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.role == 'employee':
# # #                 try:
# # #                     employee = Employee.objects.get(user=self.request.user)
# # #                     return Visit.objects.filter(employee=employee)
# # #                 except Employee.DoesNotExist:
# # #                     return Visit.objects.none()
# # #             elif user_profile.role == 'owner' and user_profile.company:
# # #                 return Visit.objects.filter(employee__company=user_profile.company)
# # #             return Visit.objects.all()
# # #         except UserProfile.DoesNotExist:
# # #             return Visit.objects.all()

# # # # Attendance Views
# # # class AttendanceListCreateView(generics.ListCreateAPIView):
# # #     serializer_class = AttendanceSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.role == 'employee':
# # #                 try:
# # #                     employee = Employee.objects.get(user=self.request.user)
# # #                     return Attendance.objects.filter(employee=employee)
# # #                 except Employee.DoesNotExist:
# # #                     return Attendance.objects.none()
# # #             elif user_profile.role == 'owner' and user_profile.company:
# # #                 return Attendance.objects.filter(employee__company=user_profile.company)
# # #             return Attendance.objects.all()
# # #         except UserProfile.DoesNotExist:
# # #             return Attendance.objects.all()

# # # @api_view(['POST'])
# # # @permission_classes([permissions.IsAuthenticated])
# # # def mark_attendance(request):
# # #     try:
# # #         employee = Employee.objects.get(user=request.user)
# # #         today = date.today()
# # #         current_time = timezone.now().time()
        
# # #         attendance, created = Attendance.objects.get_or_create(
# # #             employee=employee,
# # #             date=today,
# # #             defaults={
# # #                 'status': 'present', 
# # #                 'check_in': current_time,
# # #                 'notes': request.data.get('notes', '')
# # #             }
# # #         )
        
# # #         if not created:
# # #             if not attendance.check_out:
# # #                 attendance.check_out = current_time
# # #                 attendance.save()
# # #             else:
# # #                 return Response({'error': 'Attendance already marked for today'}, status=status.HTTP_400_BAD_REQUEST)
        
# # #         serializer = AttendanceSerializer(attendance)
# # #         return Response(serializer.data)
    
# # #     except Employee.DoesNotExist:
# # #         return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)
# # #     except Exception as e:
# # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # # Leave Request Views
# # # class LeaveRequestListCreateView(generics.ListCreateAPIView):
# # #     serializer_class = LeaveRequestSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.role == 'employee':
# # #                 try:
# # #                     employee = Employee.objects.get(user=self.request.user)
# # #                     return LeaveRequest.objects.filter(employee=employee)
# # #                 except Employee.DoesNotExist:
# # #                     return LeaveRequest.objects.none()
# # #             elif user_profile.role == 'owner' and user_profile.company:
# # #                 return LeaveRequest.objects.filter(employee__company=user_profile.company)
# # #             return LeaveRequest.objects.all()
# # #         except UserProfile.DoesNotExist:
# # #             return LeaveRequest.objects.all()
    
# # #     def perform_create(self, serializer):
# # #         try:
# # #             employee = Employee.objects.get(user=self.request.user)
# # #             serializer.save(employee=employee)
# # #         except Employee.DoesNotExist:
# # #             raise serializers.ValidationError("Employee profile not found")

# # # @api_view(['POST'])
# # # @permission_classes([permissions.IsAuthenticated])
# # # def approve_leave(request, leave_id):
# # #     try:
# # #         user_profile = UserProfile.objects.get(user=request.user)
# # #         if user_profile.role != 'owner':
# # #             return Response({'error': 'Only owners can approve leaves'}, status=status.HTTP_403_FORBIDDEN)
        
# # #         leave_request = LeaveRequest.objects.get(id=leave_id, employee__company=user_profile.company)
# # #         action = request.data.get('action')  # 'approve' or 'reject'
# # #         comments = request.data.get('comments', '')
        
# # #         if action == 'approve':
# # #             leave_request.status = 'approved'
# # #         elif action == 'reject':
# # #             leave_request.status = 'rejected'
# # #         else:
# # #             return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
        
# # #         leave_request.approved_by = request.user
# # #         leave_request.approved_date = timezone.now()
# # #         leave_request.comments = comments
# # #         leave_request.save()
        
# # #         serializer = LeaveRequestSerializer(leave_request)
# # #         return Response(serializer.data)
    
# # #     except UserProfile.DoesNotExist:
# # #         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
# # #     except LeaveRequest.DoesNotExist:
# # #         return Response({'error': 'Leave request not found'}, status=status.HTTP_404_NOT_FOUND)
# # #     except Exception as e:
# # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # # Schedule Views
# # # class ScheduleListCreateView(generics.ListCreateAPIView):
# # #     serializer_class = ScheduleSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.role == 'employee':
# # #                 try:
# # #                     employee = Employee.objects.get(user=self.request.user)
# # #                     return Schedule.objects.filter(employee=employee)
# # #                 except Employee.DoesNotExist:
# # #                     return Schedule.objects.none()
# # #             elif user_profile.role == 'owner' and user_profile.company:
# # #                 return Schedule.objects.filter(employee__company=user_profile.company)
# # #             return Schedule.objects.all()
# # #         except UserProfile.DoesNotExist:
# # #             return Schedule.objects.all()
    
# # #     def perform_create(self, serializer):
# # #         try:
# # #             employee = Employee.objects.get(user=self.request.user)
# # #             serializer.save(employee=employee)
# # #         except Employee.DoesNotExist:
# # #             raise serializers.ValidationError("Employee profile not found")

# # # class ScheduleDetailView(generics.RetrieveUpdateDestroyAPIView):
# # #     serializer_class = ScheduleSerializer
# # #     permission_classes = [permissions.IsAuthenticated]
    
# # #     def get_queryset(self):
# # #         try:
# # #             user_profile = UserProfile.objects.get(user=self.request.user)
# # #             if user_profile.role == 'employee':
# # #                 try:
# # #                     employee = Employee.objects.get(user=self.request.user)
# # #                     return Schedule.objects.filter(employee=employee)
# # #                 except Employee.DoesNotExist:
# # #                     return Schedule.objects.none()
# # #             elif user_profile.role == 'owner' and user_profile.company:
# # #                 return Schedule.objects.filter(employee__company=user_profile.company)
# # #             return Schedule.objects.all()
# # #         except UserProfile.DoesNotExist:
# # #             return Schedule.objects.all()

# # # @api_view(['GET'])
# # # @permission_classes([permissions.IsAuthenticated])
# # # def employee_visits(request, employee_id):
# # #     try:
# # #         employee = Employee.objects.get(id=employee_id)
# # #         visits = Visit.objects.filter(employee=employee)
# # #         serializer = VisitSerializer(visits, many=True)
# # #         return Response(serializer.data)
# # #     except Employee.DoesNotExist:
# # #         return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)
# # #     except Exception as e:
# # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # @api_view(['GET'])
# # # @permission_classes([permissions.IsAuthenticated])
# # # def dashboard_stats(request):
# # #     try:
# # #         user_profile = UserProfile.objects.get(user=request.user)
        
# # #         if user_profile.role == 'employee':
# # #             try:
# # #                 employee = Employee.objects.get(user=request.user)
# # #                 visits = Visit.objects.filter(employee=employee)
# # #                 schedules = Schedule.objects.filter(employee=employee)
# # #                 attendance = Attendance.objects.filter(employee=employee)
                
# # #                 stats = {
# # #                     'total_visits': visits.count(),
# # #                     'completed_visits': visits.filter(status='completed').count(),
# # #                     'pending_visits': visits.filter(status='scheduled').count(),
# # #                     'total_schedules': schedules.count(),
# # #                     'attendance_rate': 0
# # #                 }
                
# # #                 if attendance.count() > 0:
# # #                     present_days = attendance.filter(status='present').count()
# # #                     stats['attendance_rate'] = round((present_days / attendance.count()) * 100, 2)
                
# # #                 return Response(stats)
# # #             except Employee.DoesNotExist:
# # #                 return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)
        
# # #         elif user_profile.role == 'owner' and user_profile.company:
# # #             employees = Employee.objects.filter(company=user_profile.company)
# # #             visits = Visit.objects.filter(employee__company=user_profile.company)
# # #             products = Product.objects.filter(company=user_profile.company)
# # #             organizations = Organization.objects.filter(company=user_profile.company)
            
# # #             stats = {
# # #                 'total_employees': employees.count(),
# # #                 'total_visits': visits.count(),
# # #                 'total_products': products.count(),
# # #                 'total_organizations': organizations.count(),
# # #                 'completed_visits': visits.filter(status='completed').count(),
# # #                 'pending_visits': visits.filter(status='scheduled').count()
# # #             }
            
# # #             return Response(stats)
        
# # #         return Response({'error': 'Invalid user role'}, status=status.HTTP_400_BAD_REQUEST)
    
# # #     except UserProfile.DoesNotExist:
# # #         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
# # #     except Exception as e:
# # #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # your_app/views.py
# # from rest_framework import generics, status, permissions
# # from rest_framework.decorators import api_view, permission_classes
# # from rest_framework.response import Response
# # from rest_framework_simplejwt.tokens import RefreshToken
# # from django.contrib.auth import authenticate
# # from django.contrib.auth.models import User
# # from django.utils import timezone
# # from datetime import date
# # from django.db import transaction
# # from rest_framework.serializers import ValidationError

# # from .models import (
# #     Company, UserProfile, Employee, Organization, 
# #     Doctor, Product, Visit, Attendance, Schedule, LeaveRequest
# # )
# # from .serializers import (
# #     UserSerializer, UserProfileSerializer, CompanySerializer,
# #     EmployeeSerializer, OrganizationSerializer, DoctorSerializer,
# #     ProductSerializer, VisitSerializer, AttendanceSerializer,
# #     ScheduleSerializer, UserRegistrationSerializer, EmployeeCreateSerializer,
# #     LeaveRequestSerializer
# # )

# # @api_view(['POST'])
# # @permission_classes([permissions.AllowAny])
# # def login_view(request):
# #     try:
# #         username = request.data.get('username')
# #         password = request.data.get('password')
        
# #         if not username or not password:
# #             return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
# #         user = authenticate(username=username, password=password)
# #         if user:
# #             refresh = RefreshToken.for_user(user)
# #             try:
# #                 profile = UserProfile.objects.get(user=user)
# #                 user_data = {
# #                     'id': user.id,
# #                     'username': user.username,
# #                     'email': user.email,
# #                     'first_name': user.first_name,
# #                     'last_name': user.last_name,
# #                     'role': profile.role,
# #                     'company': profile.company.id if profile.company else None
# #                 }
# #             except UserProfile.DoesNotExist:
# #                 user_data = {
# #                     'id': user.id,
# #                     'username': user.username,
# #                     'email': user.email,
# #                     'first_name': user.first_name,
# #                     'last_name': user.last_name,
# #                     'role': 'employee',
# #                     'company': None
# #                 }
            
# #             return Response({
# #                 'access': str(refresh.access_token),
# #                 'user': user_data
# #             })
        
# #         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
# #     except Exception as e:
# #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # @api_view(['POST'])
# # @permission_classes([permissions.AllowAny])
# # def signup_view(request):
# #     try:
# #         serializer = UserRegistrationSerializer(data=request.data)
# #         if serializer.is_valid():
# #             user = serializer.save()
# #             refresh = RefreshToken.for_user(user)
# #             profile = UserProfile.objects.get(user=user)
            
# #             user_data = {
# #                 'id': user.id,
# #                 'username': user.username,
# #                 'email': user.email,
# #                 'first_name': user.first_name,
# #                 'last_name': user.last_name,
# #                 'role': profile.role,
# #                 'company': profile.company.id if profile.company else None
# #             }
            
# #             return Response({
# #                 'access': str(refresh.access_token),
# #                 'user': user_data
# #             }, status=status.HTTP_201_CREATED)
        
# #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# #     except Exception as e:
# #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # @api_view(['GET'])
# # @permission_classes([permissions.IsAuthenticated])
# # def get_user_profile(request):
# #     try:
# #         user_profile = UserProfile.objects.get(user=request.user)
# #         serializer = UserProfileSerializer(user_profile)
# #         return Response(serializer.data)
# #     except UserProfile.DoesNotExist:
# #         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
# #     except Exception as e:
# #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # Company Views
# # class CompanyListCreateView(generics.ListCreateAPIView):
# #     queryset = Company.objects.all()
# #     serializer_class = CompanySerializer
# #     permission_classes = [permissions.IsAuthenticated]

# #     def perform_create(self, serializer):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.role != 'owner':
# #                 raise ValidationError("Only company owners can create companies")
# #             serializer.save()
# #         except UserProfile.DoesNotExist:
# #             raise ValidationError("User profile not found")

# # # Employee Views
# # class EmployeeListCreateView(generics.ListCreateAPIView):
# #     serializer_class = EmployeeSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.role == 'owner' and user_profile.company:
# #                 return Employee.objects.filter(company=user_profile.company)
# #             elif user_profile.role == 'employee':
# #                 return Employee.objects.filter(user=self.request.user)
# #             return Employee.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Employee.objects.none()

# # @api_view(['POST'])
# # @permission_classes([permissions.IsAuthenticated])
# # def create_employee(request):
# #     try:
# #         user_profile = UserProfile.objects.get(user=request.user)
# #         if user_profile.role != 'owner':
# #             return Response({'error': 'Only company owners can create employees'}, status=status.HTTP_403_FORBIDDEN)
        
# #         serializer = EmployeeCreateSerializer(data=request.data, context={'request': request})
# #         if serializer.is_valid():
# #             employee = serializer.save()
# #             return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
        
# #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# #     except UserProfile.DoesNotExist:
# #         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
# #     except Exception as e:
# #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # Organization Views
# # class OrganizationListCreateView(generics.ListCreateAPIView):
# #     serializer_class = OrganizationSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.company:
# #                 return Organization.objects.filter(company=user_profile.company)
# #             return Organization.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Organization.objects.none()
    
# #     def perform_create(self, serializer):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.role != 'owner':
# #                 raise ValidationError("Only company owners can create organizations")
# #             if user_profile.company:
# #                 serializer.save(company=user_profile.company)
# #             else:
# #                 raise ValidationError("User must be associated with a company")
# #         except UserProfile.DoesNotExist:
# #             raise ValidationError("User profile not found")

# # class OrganizationDetailView(generics.RetrieveUpdateDestroyAPIView):
# #     serializer_class = OrganizationSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.company:
# #                 return Organization.objects.filter(company=user_profile.company)
# #             return Organization.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Organization.objects.none()

# # # Doctor Views
# # class DoctorListCreateView(generics.ListCreateAPIView):
# #     serializer_class = DoctorSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.company:
# #                 return Doctor.objects.filter(organization__company=user_profile.company)
# #             return Doctor.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Doctor.objects.none()

# # class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):
# #     serializer_class = DoctorSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.company:
# #                 return Doctor.objects.filter(organization__company=user_profile.company)
# #             return Doctor.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Doctor.objects.none()

# # # Product Views
# # class ProductListCreateView(generics.ListCreateAPIView):
# #     serializer_class = ProductSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.company:
# #                 return Product.objects.filter(company=user_profile.company, is_active=True)
# #             return Product.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Product.objects.none()
    
# #     def perform_create(self, serializer):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.role != 'owner':
# #                 raise ValidationError("Only company owners can create products")
# #             if user_profile.company:
# #                 serializer.save(company=user_profile.company)
# #             else:
# #                 raise ValidationError("User must be associated with a company")
# #         except UserProfile.DoesNotExist:
# #             raise ValidationError("User profile not found")

# # class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
# #     serializer_class = ProductSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.company:
# #                 return Product.objects.filter(company=user_profile.company)
# #             return Product.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Product.objects.none()

# # # Visit Views
# # class VisitListCreateView(generics.ListCreateAPIView):
# #     serializer_class = VisitSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.role == 'employee':
# #                 try:
# #                     employee = Employee.objects.get(user=self.request.user)
# #                     return Visit.objects.filter(employee=employee)
# #                 except Employee.DoesNotExist:
# #                     return Visit.objects.none()
# #             elif user_profile.role == 'owner' and user_profile.company:
# #                 return Visit.objects.filter(employee__company=user_profile.company)
# #             return Visit.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Visit.objects.none()
    
# #     def perform_create(self, serializer):
# #         try:
# #             employee = Employee.objects.get(user=self.request.user)
# #             serializer.save(employee=employee)
# #         except Employee.DoesNotExist:
# #             raise ValidationError("Employee profile not found")

# # class VisitDetailView(generics.RetrieveUpdateDestroyAPIView):
# #     serializer_class = VisitSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.role == 'employee':
# #                 try:
# #                     employee = Employee.objects.get(user=self.request.user)
# #                     return Visit.objects.filter(employee=employee)
# #                 except Employee.DoesNotExist:
# #                     return Visit.objects.none()
# #             elif user_profile.role == 'owner' and user_profile.company:
# #                 return Visit.objects.filter(employee__company=user_profile.company)
# #             return Visit.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Visit.objects.none()

# # # Attendance Views
# # class AttendanceListCreateView(generics.ListCreateAPIView):
# #     serializer_class = AttendanceSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.role == 'employee':
# #                 try:
# #                     employee = Employee.objects.get(user=self.request.user)
# #                     return Attendance.objects.filter(employee=employee)
# #                 except Employee.DoesNotExist:
# #                     return Attendance.objects.none()
# #             elif user_profile.role == 'owner' and user_profile.company:
# #                 return Attendance.objects.filter(employee__company=user_profile.company)
# #             return Attendance.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Attendance.objects.none()

# # @api_view(['POST'])
# # @permission_classes([permissions.IsAuthenticated])
# # def mark_attendance(request):
# #     try:
# #         employee = Employee.objects.get(user=request.user)
# #         today = date.today()
# #         current_time = timezone.now().time()
        
# #         attendance, created = Attendance.objects.get_or_create(
# #             employee=employee,
# #             date=today,
# #             defaults={
# #                 'status': 'present', 
# #                 'check_in': current_time,
# #                 'notes': request.data.get('notes', '')
# #             }
# #         )
        
# #         if not created:
# #             if not attendance.check_out:
# #                 attendance.check_out = current_time
# #                 attendance.save()
# #             else:
# #                 return Response({'error': 'Attendance already marked for today'}, status=status.HTTP_400_BAD_REQUEST)
        
# #         serializer = AttendanceSerializer(attendance)
# #         return Response(serializer.data)
    
# #     except Employee.DoesNotExist:
# #         return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)
# #     except Exception as e:
# #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # Leave Request Views
# # class LeaveRequestListCreateView(generics.ListCreateAPIView):
# #     serializer_class = LeaveRequestSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.role == 'employee':
# #                 try:
# #                     employee = Employee.objects.get(user=self.request.user)
# #                     return LeaveRequest.objects.filter(employee=employee)
# #                 except Employee.DoesNotExist:
# #                     return LeaveRequest.objects.none()
# #             elif user_profile.role == 'owner' and user_profile.company:
# #                 return LeaveRequest.objects.filter(employee__company=user_profile.company)
# #             return LeaveRequest.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return LeaveRequest.objects.none()
    
# #     def perform_create(self, serializer):
# #         try:
# #             employee = Employee.objects.get(user=self.request.user)
# #             serializer.save(employee=employee)
# #         except Employee.DoesNotExist:
# #             raise ValidationError("Employee profile not found")

# # @api_view(['POST'])
# # @permission_classes([permissions.IsAuthenticated])
# # def approve_leave(request, leave_id):
# #     try:
# #         user_profile = UserProfile.objects.get(user=request.user)
# #         if user_profile.role != 'owner':
# #             return Response({'error': 'Only owners can approve leaves'}, status=status.HTTP_403_FORBIDDEN)
        
# #         leave_request = LeaveRequest.objects.get(id=leave_id, employee__company=user_profile.company)
# #         action = request.data.get('action')  # 'approve' or 'reject'
# #         comments = request.data.get('comments', '')
        
# #         if action == 'approve':
# #             leave_request.status = 'approved'
# #         elif action == 'reject':
# #             leave_request.status = 'rejected'
# #         else:
# #             return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
        
# #         leave_request.approved_by = request.user
# #         leave_request.approved_date = timezone.now()
# #         leave_request.comments = comments
# #         leave_request.save()
        
# #         serializer = LeaveRequestSerializer(leave_request)
# #         return Response(serializer.data)
    
# #     except UserProfile.DoesNotExist:
# #         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
# #     except LeaveRequest.DoesNotExist:
# #         return Response({'error': 'Leave request not found'}, status=status.HTTP_404_NOT_FOUND)
# #     except Exception as e:
# #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # # Schedule Views
# # class ScheduleListCreateView(generics.ListCreateAPIView):
# #     serializer_class = ScheduleSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.role == 'employee':
# #                 try:
# #                     employee = Employee.objects.get(user=self.request.user)
# #                     return Schedule.objects.filter(employee=employee)
# #                 except Employee.DoesNotExist:
# #                     return Schedule.objects.none()
# #             elif user_profile.role == 'owner' and user_profile.company:
# #                 return Schedule.objects.filter(employee__company=user_profile.company)
# #             return Schedule.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Schedule.objects.none()
    
# #     def perform_create(self, serializer):
# #         try:
# #             employee = Employee.objects.get(user=self.request.user)
# #             serializer.save(employee=employee)
# #         except Employee.DoesNotExist:
# #             raise ValidationError("Employee profile not found")

# # class ScheduleDetailView(generics.RetrieveUpdateDestroyAPIView):
# #     serializer_class = ScheduleSerializer
# #     permission_classes = [permissions.IsAuthenticated]
    
# #     def get_queryset(self):
# #         try:
# #             user_profile = UserProfile.objects.get(user=self.request.user)
# #             if user_profile.role == 'employee':
# #                 try:
# #                     employee = Employee.objects.get(user=self.request.user)
# #                     return Schedule.objects.filter(employee=employee)
# #                 except Employee.DoesNotExist:
# #                     return Schedule.objects.none()
# #             elif user_profile.role == 'owner' and user_profile.company:
# #                 return Schedule.objects.filter(employee__company=user_profile.company)
# #             return Schedule.objects.none()
# #         except UserProfile.DoesNotExist:
# #             return Schedule.objects.none()

# # @api_view(['GET'])
# # @permission_classes([permissions.IsAuthenticated])
# # def employee_visits(request, employee_id):
# #     try:
# #         employee = Employee.objects.get(id=employee_id)
# #         visits = Visit.objects.filter(employee=employee)
# #         serializer = VisitSerializer(visits, many=True)
# #         return Response(serializer.data)
# #     except Employee.DoesNotExist:
# #         return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)
# #     except Exception as e:
# #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # @api_view(['GET'])
# # @permission_classes([permissions.IsAuthenticated])
# # def dashboard_stats(request):
# #     try:
# #         user_profile = UserProfile.objects.get(user=request.user)
        
# #         if user_profile.role == 'employee':
# #             try:
# #                 employee = Employee.objects.get(user=request.user)
# #                 visits = Visit.objects.filter(employee=employee)
# #                 schedules = Schedule.objects.filter(employee=employee)
# #                 attendance = Attendance.objects.filter(employee=employee)
                
# #                 stats = {
# #                     'total_visits': visits.count(),
# #                     'completed_visits': visits.filter(status='completed').count(),
# #                     'pending_visits': visits.filter(status='scheduled').count(),
# #                     'total_schedules': schedules.count(),
# #                     'attendance_rate': 0
# #                 }
                
# #                 if attendance.count() > 0:
# #                     present_days = attendance.filter(status='present').count()
# #                     stats['attendance_rate'] = round((present_days / attendance.count()) * 100, 2)
                
# #                 return Response(stats)
# #             except Employee.DoesNotExist:
# #                 return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)
# #         elif user_profile.role == 'owner' and user_profile.company:
# #             employees = Employee.objects.filter(company=user_profile.company)
# #             visits = Visit.objects.filter(employee__company=user_profile.company)
# #             products = Product.objects.filter(company=user_profile.company)
# #             organizations = Organization.objects.filter(company=user_profile.company)
            
# #             stats = {
# #                 'total_employees': employees.count(),
# #                 'total_visits': visits.count(),
# #                 'total_products': products.count(),
# #                 'total_organizations': organizations.count(),
# #                 'completed_visits': visits.filter(status='completed').count(),
# #                 'pending_visits': visits.filter(status='scheduled').count()
# #             }
            
# #             return Response(stats)
        
# #         return Response({'error': 'Invalid user role or no company associated'}, status=status.HTTP_400_BAD_REQUEST)
    
# #     except UserProfile.DoesNotExist:
# #         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
# #     except Exception as e:
# #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# from rest_framework import generics, status, permissions
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.contrib.auth import authenticate
# from django.contrib.auth.models import User
# from django.utils import timezone
# from datetime import date
# from django.db import transaction
# from rest_framework.serializers import ValidationError

# from .models import (
#     Company, UserProfile, Employee, Organization, 
#     Doctor, Product, Visit, Attendance, Schedule, LeaveRequest
# )
# from .serializers import (
#     UserSerializer, UserProfileSerializer, CompanySerializer,
#     EmployeeSerializer, OrganizationSerializer, DoctorSerializer,
#     ProductSerializer, VisitSerializer, AttendanceSerializer,
#     ScheduleSerializer, UserRegistrationSerializer, EmployeeCreateSerializer,
#     LeaveRequestSerializer
# )

# @api_view(['POST'])
# @permission_classes([permissions.AllowAny])
# def login_view(request):
#     try:
#         username = request.data.get('username')
#         password = request.data.get('password')
        
#         if not username or not password:
#             return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
#         user = authenticate(username=username, password=password)
#         if user:
#             refresh = RefreshToken.for_user(user)
#             try:
#                 profile = UserProfile.objects.get(user=user)
#                 user_data = {
#                     'id': user.id,
#                     'username': user.username,
#                     'email': user.email,
#                     'first_name': user.first_name,
#                     'last_name': user.last_name,
#                     'role': profile.role,
#                     'company': profile.company.id if profile.company else None
#                 }
#             except UserProfile.DoesNotExist:
#                 user_data = {
#                     'id': user.id,
#                     'username': user.username,
#                     'email': user.email,
#                     'first_name': user.first_name,
#                     'last_name': user.last_name,
#                     'role': 'employee',
#                     'company': None
#                 }
            
#             return Response({
#                 'access': str(refresh.access_token),
#                 'user': user_data
#             })
        
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @api_view(['POST'])
# @permission_classes([permissions.AllowAny])
# def signup_view(request):
#     try:
#         serializer = UserRegistrationSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             refresh = RefreshToken.for_user(user)
#             profile = UserProfile.objects.get(user=user)
            
#             user_data = {
#                 'id': user.id,
#                 'username': user.username,
#                 'email': user.email,
#                 'first_name': user.first_name,
#                 'last_name': user.last_name,
#                 'role': profile.role,
#                 'company': profile.company.id if profile.company else None
#             }
            
#             return Response({
#                 'access': str(refresh.access_token),
#                 'user': user_data
#             }, status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
# def get_user_profile(request):
#     try:
#         user_profile = UserProfile.objects.get(user=request.user)
#         serializer = UserProfileSerializer(user_profile)
#         return Response(serializer.data)
#     except UserProfile.DoesNotExist:
#         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # Company Views
# class CompanyListCreateView(generics.ListCreateAPIView):
#     queryset = Company.objects.all()
#     serializer_class = CompanySerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.role != 'owner':
#                 raise ValidationError("Only company owners can create companies")
#             serializer.save()
#         except UserProfile.DoesNotExist:
#             raise ValidationError("User profile not found")

# # Employee Views
# class EmployeeListCreateView(generics.ListCreateAPIView):
#     serializer_class = EmployeeSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.role == 'owner' and user_profile.company:
#                 return Employee.objects.filter(company=user_profile.company)
#             elif user_profile.role == 'employee':
#                 return Employee.objects.filter(user=self.request.user)
#             return Employee.objects.none()
#         except UserProfile.DoesNotExist:
#             return Employee.objects.none()

# @api_view(['POST'])
# @permission_classes([permissions.IsAuthenticated])
# def create_employee(request):
#     try:
#         user_profile = UserProfile.objects.get(user=request.user)
#         if user_profile.role != 'owner':
#             return Response({'error': 'Only company owners can create employees'}, status=status.HTTP_403_FORBIDDEN)
        
#         serializer = EmployeeCreateSerializer(data=request.data, context={'request': request})
#         if serializer.is_valid():
#             employee = serializer.save()
#             return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     except UserProfile.DoesNotExist:
#         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # Organization Views
# class OrganizationListCreateView(generics.ListCreateAPIView):
#     serializer_class = OrganizationSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.company:
#                 return Organization.objects.filter(company=user_profile.company)
#             return Organization.objects.none()
#         except UserProfile.DoesNotExist:
#             return Organization.objects.none()
    
#     def perform_create(self, serializer):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.role != 'owner':
#                 raise ValidationError("Only company owners can create organizations")
#             if user_profile.company:
#                 serializer.save(company=user_profile.company)
#             else:
#                 raise ValidationError("User must be associated with a company")
#         except UserProfile.DoesNotExist:
#             raise ValidationError("User profile not found")

# class OrganizationDetailView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = OrganizationSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.company:
#                 return Organization.objects.filter(company=user_profile.company)
#             return Organization.objects.none()
#         except UserProfile.DoesNotExist:
#             return Organization.objects.none()

# # Doctor Views
# class DoctorListCreateView(generics.ListCreateAPIView):
#     serializer_class = DoctorSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.company:
#                 # Filter doctors associated with the company's organizations
#                 return Doctor.objects.filter(organizations__company=user_profile.company).distinct()
#             return Doctor.objects.none()
#         except UserProfile.DoesNotExist:
#             return Doctor.objects.none()
    
#     def perform_create(self, serializer):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.role != 'owner':
#                 raise ValidationError("Only company owners can create doctors")
#             serializer.save()
#         except UserProfile.DoesNotExist:
#             raise ValidationError("User profile not found")

# class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = DoctorSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.company:
#                 return Doctor.objects.filter(organizations__company=user_profile.company).distinct()
#             return Doctor.objects.none()
#         except UserProfile.DoesNotExist:
#             return Doctor.objects.none()

# # Product Views
# class ProductListCreateView(generics.ListCreateAPIView):
#     serializer_class = ProductSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.company:
#                 return Product.objects.filter(company=user_profile.company, is_active=True)
#             return Product.objects.none()
#         except UserProfile.DoesNotExist:
#             return Product.objects.none()
    
#     def perform_create(self, serializer):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.role != 'owner':
#                 raise ValidationError("Only company owners can create products")
#             if user_profile.company:
#                 serializer.save(company=user_profile.company)
#             else:
#                 raise ValidationError("User must be associated with a company")
#         except UserProfile.DoesNotExist:
#             raise ValidationError("User profile not found")

# class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = ProductSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.company:
#                 return Product.objects.filter(company=user_profile.company)
#             return Product.objects.none()
#         except UserProfile.DoesNotExist:
#             return Product.objects.none()

# # Visit Views
# class VisitListCreateView(generics.ListCreateAPIView):
#     serializer_class = VisitSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.role == 'employee':
#                 try:
#                     employee = Employee.objects.get(user=self.request.user)
#                     return Visit.objects.filter(employee=employee)
#                 except Employee.DoesNotExist:
#                     return Visit.objects.none()
#             elif user_profile.role == 'owner' and user_profile.company:
#                 return Visit.objects.filter(employee__company=user_profile.company)
#             return Visit.objects.none()
#         except UserProfile.DoesNotExist:
#             return Visit.objects.none()
    
#     def perform_create(self, serializer):
#         try:
#             employee = Employee.objects.get(user=self.request.user)
#             serializer.save(employee=employee)
#         except Employee.DoesNotExist:
#             raise ValidationError("Employee profile not found")

# class VisitDetailView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = VisitSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.role == 'employee':
#                 try:
#                     employee = Employee.objects.get(user=self.request.user)
#                     return Visit.objects.filter(employee=employee)
#                 except Employee.DoesNotExist:
#                     return Visit.objects.none()
#             elif user_profile.role == 'owner' and user_profile.company:
#                 return Visit.objects.filter(employee__company=user_profile.company)
#             return Visit.objects.none()
#         except UserProfile.DoesNotExist:
#             return Visit.objects.none()

# # Attendance Views
# class AttendanceListCreateView(generics.ListCreateAPIView):
#     serializer_class = AttendanceSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.role == 'employee':
#                 try:
#                     employee = Employee.objects.get(user=self.request.user)
#                     return Attendance.objects.filter(employee=employee)
#                 except Employee.DoesNotExist:
#                     return Attendance.objects.none()
#             elif user_profile.role == 'owner' and user_profile.company:
#                 return Attendance.objects.filter(employee__company=user_profile.company)
#             return Attendance.objects.none()
#         except UserProfile.DoesNotExist:
#             return Attendance.objects.none()

# @api_view(['POST'])
# @permission_classes([permissions.IsAuthenticated])
# def mark_attendance(request):
#     try:
#         employee = Employee.objects.get(user=request.user)
#         today = date.today()
#         current_time = timezone.now().time()
        
#         attendance, created = Attendance.objects.get_or_create(
#             employee=employee,
#             date=today,
#             defaults={
#                 'status': 'present', 
#                 'check_in': current_time,
#                 'notes': request.data.get('notes', '')
#             }
#         )
        
#         if not created:
#             if not attendance.check_out:
#                 attendance.check_out = current_time
#                 attendance.save()
#             else:
#                 return Response({'error': 'Attendance already marked for today'}, status=status.HTTP_400_BAD_REQUEST)
        
#         serializer = AttendanceSerializer(attendance)
#         return Response(serializer.data)
    
#     except Employee.DoesNotExist:
#         return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # Leave Request Views
# class LeaveRequestListCreateView(generics.ListCreateAPIView):
#     serializer_class = LeaveRequestSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.role == 'employee':
#                 try:
#                     employee = Employee.objects.get(user=self.request.user)
#                     return LeaveRequest.objects.filter(employee=employee)
#                 except Employee.DoesNotExist:
#                     return LeaveRequest.objects.none()
#             elif user_profile.role == 'owner' and user_profile.company:
#                 return LeaveRequest.objects.filter(employee__company=user_profile.company)
#             return LeaveRequest.objects.none()
#         except UserProfile.DoesNotExist:
#             return LeaveRequest.objects.none()
    
#     def perform_create(self, serializer):
#         try:
#             employee = Employee.objects.get(user=self.request.user)
#             serializer.save(employee=employee)
#         except Employee.DoesNotExist:
#             raise ValidationError("Employee profile not found")

# @api_view(['POST'])
# @permission_classes([permissions.IsAuthenticated])
# def approve_leave(request, leave_id):
#     try:
#         user_profile = UserProfile.objects.get(user=request.user)
#         if user_profile.role != 'owner':
#             return Response({'error': 'Only owners can approve leaves'}, status=status.HTTP_403_FORBIDDEN)
        
#         leave_request = LeaveRequest.objects.get(id=leave_id, employee__company=user_profile.company)
#         action = request.data.get('action')  # 'approve' or 'reject'
#         comments = request.data.get('comments', '')
        
#         if action == 'approve':
#             leave_request.status = 'approved'
#         elif action == 'reject':
#             leave_request.status = 'rejected'
#         else:
#             return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
        
#         leave_request.approved_by = request.user
#         leave_request.approved_date = timezone.now()
#         leave_request.comments = comments
#         leave_request.save()
        
#         serializer = LeaveRequestSerializer(leave_request)
#         return Response(serializer.data)
    
#     except UserProfile.DoesNotExist:
#         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
#     except LeaveRequest.DoesNotExist:
#         return Response({'error': 'Leave request not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# # Schedule Views
# class ScheduleListCreateView(generics.ListCreateAPIView):
#     serializer_class = ScheduleSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.role == 'employee':
#                 try:
#                     employee = Employee.objects.get(user=self.request.user)
#                     return Schedule.objects.filter(employee=employee)
#                 except Employee.DoesNotExist:
#                     return Schedule.objects.none()
#             elif user_profile.role == 'owner' and user_profile.company:
#                 return Schedule.objects.filter(employee__company=user_profile.company)
#             return Schedule.objects.none()
#         except UserProfile.DoesNotExist:
#             return Schedule.objects.none()
    
#     def perform_create(self, serializer):
#         try:
#             employee = Employee.objects.get(user=self.request.user)
#             serializer.save(employee=employee)
#         except Employee.DoesNotExist:
#             raise ValidationError("Employee profile not found")

# class ScheduleDetailView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = ScheduleSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         try:
#             user_profile = UserProfile.objects.get(user=self.request.user)
#             if user_profile.role == 'employee':
#                 try:
#                     employee = Employee.objects.get(user=self.request.user)
#                     return Schedule.objects.filter(employee=employee)
#                 except Employee.DoesNotExist:
#                     return Schedule.objects.none()
#             elif user_profile.role == 'owner' and user_profile.company:
#                 return Schedule.objects.filter(employee__company=user_profile.company)
#             return Schedule.objects.none()
#         except UserProfile.DoesNotExist:
#             return Schedule.objects.none()

# @api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
# def employee_visits(request, employee_id):
#     try:
#         employee = Employee.objects.get(id=employee_id)
#         visits = Visit.objects.filter(employee=employee)
#         serializer = VisitSerializer(visits, many=True)
#         return Response(serializer.data)
#     except Employee.DoesNotExist:
#         return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
# def dashboard_stats(request):
#     try:
#         user_profile = UserProfile.objects.get(user=request.user)
        
#         if user_profile.role == 'employee':
#             try:
#                 employee = Employee.objects.get(user=request.user)
#                 visits = Visit.objects.filter(employee=employee)
#                 schedules = Schedule.objects.filter(employee=employee)
#                 attendance = Attendance.objects.filter(employee=employee)
                
#                 stats = {
#                     'total_visits': visits.count(),
#                     'completed_visits': visits.filter(status='completed').count(),
#                     'pending_visits': visits.filter(status='scheduled').count(),
#                     'total_schedules': schedules.count(),
#                     'attendance_rate': 0
#                 }
                
#                 if attendance.count() > 0:
#                     present_days = attendance.filter(status='present').count()
#                     stats['attendance_rate'] = round((present_days / attendance.count()) * 100, 2)
                
#                 return Response(stats)
#             except Employee.DoesNotExist:
#                 return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)
#         elif user_profile.role == 'owner' and user_profile.company:
#             employees = Employee.objects.filter(company=user_profile.company)
#             visits = Visit.objects.filter(employee__company=user_profile.company)
#             products = Product.objects.filter(company=user_profile.company)
#             organizations = Organization.objects.filter(company=user_profile.company)
            
#             stats = {
#                 'total_employees': employees.count(),
#                 'total_visits': visits.count(),
#                 'total_products': products.count(),
#                 'total_organizations': organizations.count(),
#                 'completed_visits': visits.filter(status='completed').count(),
#                 'pending_visits': visits.filter(status='scheduled').count()
#             }
            
#             return Response(stats)
        
#         return Response({'error': 'Invalid user role or no company associated'}, status=status.HTTP_400_BAD_REQUEST)
    
#     except UserProfile.DoesNotExist:
#         return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
#     except Exception as e:
#         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import date
from django.db import transaction
from rest_framework.serializers import ValidationError

from .models import (
    Company, UserProfile, Employee, Organization, 
    Doctor, Product, Visit, Attendance, Schedule, LeaveRequest
)
from .serializers import (
    UserSerializer, UserProfileSerializer, CompanySerializer,
    EmployeeSerializer, OrganizationSerializer, DoctorSerializer,
    ProductSerializer, VisitSerializer, AttendanceSerializer,
    ScheduleSerializer, UserRegistrationSerializer, EmployeeCreateSerializer,
    LeaveRequestSerializer
)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            try:
                profile = UserProfile.objects.get(user=user)
                user_data = {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': profile.role,
                    'company': profile.company.id if profile.company else None
                }
            except UserProfile.DoesNotExist:
                user_data = {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'role': 'employee',
                    'company': None
                }
            
            return Response({
                'access': str(refresh.access_token),
                'user': user_data
            })
        
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def signup_view(request):
    try:
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            profile = UserProfile.objects.get(user=user)
            
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': profile.role,
                'company': profile.company.id if profile.company else None
            }
            
            return Response({
                'access': str(refresh.access_token),
                'user': user_data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_user_profile(request):
    try:
        user_profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Company Views
class CompanyListCreateView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.role != 'owner':
                raise ValidationError("Only company owners can create companies")
            serializer.save()
        except UserProfile.DoesNotExist:
            raise ValidationError("User profile not found")

# Employee Views
class EmployeeListCreateView(generics.ListCreateAPIView):
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.role == 'owner' and user_profile.company:
                return Employee.objects.filter(company=user_profile.company)
            elif user_profile.role == 'employee':
                return Employee.objects.filter(user=self.request.user)
            return Employee.objects.none()
        except UserProfile.DoesNotExist:
            return Employee.objects.none()

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_employee(request):
    try:
        user_profile = UserProfile.objects.get(user=request.user)
        if user_profile.role != 'owner':
            return Response({'error': 'Only company owners can create employees'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = EmployeeCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            employee = serializer.save()
            return Response(EmployeeSerializer(employee).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Organization Views
class OrganizationListCreateView(generics.ListCreateAPIView):
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.company:
                return Organization.objects.filter(company=user_profile.company)
            return Organization.objects.none()
        except UserProfile.DoesNotExist:
            return Organization.objects.none()
    
    def perform_create(self, serializer):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.role != 'owner':
                raise ValidationError("Only company owners can create organizations")
            if user_profile.company:
                serializer.save(company=user_profile.company)
            else:
                raise ValidationError("User must be associated with a company")
        except UserProfile.DoesNotExist:
            raise ValidationError("User profile not found")

class OrganizationDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.company:
                return Organization.objects.filter(company=user_profile.company)
            return Organization.objects.none()
        except UserProfile.DoesNotExist:
            return Organization.objects.none()

# Doctor Views
class DoctorListCreateView(generics.ListCreateAPIView):
    serializer_class = DoctorSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.company:
                return Doctor.objects.filter(organizations__company=user_profile.company).distinct()
            return Doctor.objects.none()
        except UserProfile.DoesNotExist:
            return Doctor.objects.none()
    
    def perform_create(self, serializer):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.role != 'owner':
                raise ValidationError("Only company owners can create doctors")
            serializer.save()
        except UserProfile.DoesNotExist:
            raise ValidationError("User profile not found")

class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DoctorSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.company:
                return Doctor.objects.filter(organizations__company=user_profile.company).distinct()
            return Doctor.objects.none()
        except UserProfile.DoesNotExist:
            return Doctor.objects.none()

# Product Views
class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.company:
                return Product.objects.filter(company=user_profile.company, is_active=True)
            return Product.objects.none()
        except UserProfile.DoesNotExist:
            return Product.objects.none()
    
    def perform_create(self, serializer):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.role != 'owner':
                raise ValidationError("Only company owners can create products")
            if user_profile.company:
                serializer.save(company=user_profile.company)
            else:
                raise ValidationError("User must be associated with a company")
        except UserProfile.DoesNotExist:
            raise ValidationError("User profile not found")

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.company:
                return Product.objects.filter(company=user_profile.company)
            return Product.objects.none()
        except UserProfile.DoesNotExist:
            return Product.objects.none()

# Visit Views
class VisitListCreateView(generics.ListCreateAPIView):
    serializer_class = VisitSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.role == 'employee':
                try:
                    employee = Employee.objects.get(user=self.request.user)
                    return Visit.objects.filter(employee=employee)
                except Employee.DoesNotExist:
                    return Visit.objects.none()
            elif user_profile.role == 'owner' and user_profile.company:
                return Visit.objects.filter(employee__company=user_profile.company)
            return Visit.objects.none()
        except UserProfile.DoesNotExist:
            return Visit.objects.none()
    
    def perform_create(self, serializer):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            employee_id = serializer.validated_data.get('employee')
            if not isinstance(employee_id, int):
                raise ValidationError({'employee': f'Employee ID must be an integer, got {type(employee_id)}: {employee_id}'})
            if user_profile.role == 'employee':
                # Non-owners can only create visits for themselves
                employee = Employee.objects.get(user=self.request.user)
                if employee_id != employee.id:
                    raise ValidationError({'employee': 'You can only create visits for yourself'})
                serializer.save(employee=employee)
            elif user_profile.role == 'owner' and user_profile.company:
                # Owners can create visits for any employee in their company
                if not employee_id:
                    raise ValidationError({'employee': 'Employee ID is required'})
                employee = Employee.objects.get(id=employee_id, company=user_profile.company)
                serializer.save(employee=employee)
            else:
                raise ValidationError({'detail': 'Invalid user role or no company associated'})
        except UserProfile.DoesNotExist:
            raise ValidationError({'detail': 'User profile not found'})
        except Employee.DoesNotExist:
            raise ValidationError({'employee': 'Employee not found or not associated with your company'})

class VisitDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VisitSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.role == 'employee':
                try:
                    employee = Employee.objects.get(user=self.request.user)
                    return Visit.objects.filter(employee=employee)
                except Employee.DoesNotExist:
                    return Visit.objects.none()
            elif user_profile.role == 'owner' and user_profile.company:
                return Visit.objects.filter(employee__company=user_profile.company)
            return Visit.objects.none()
        except UserProfile.DoesNotExist:
            return Visit.objects.none()

# Attendance Views
class AttendanceListCreateView(generics.ListCreateAPIView):
    serializer_class = AttendanceSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.role == 'employee':
                try:
                    employee = Employee.objects.get(user=self.request.user)
                    return Attendance.objects.filter(employee=employee)
                except Employee.DoesNotExist:
                    return Attendance.objects.none()
            elif user_profile.role == 'owner' and user_profile.company:
                return Attendance.objects.filter(employee__company=user_profile.company)
            return Attendance.objects.none()
        except UserProfile.DoesNotExist:
            return Attendance.objects.none()

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def mark_attendance(request):
    try:
        employee = Employee.objects.get(user=request.user)
        today = date.today()
        current_time = timezone.now().time()
        
        attendance, created = Attendance.objects.get_or_create(
            employee=employee,
            date=today,
            defaults={
                'status': 'present', 
                'check_in': current_time,
                'notes': request.data.get('notes', '')
            }
        )
        
        if not created:
            if not attendance.check_out:
                attendance.check_out = current_time
                attendance.save()
            else:
                return Response({'error': 'Attendance already marked for today'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = AttendanceSerializer(attendance)
        return Response(serializer.data)
    
    except Employee.DoesNotExist:
        return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Leave Request Views
class LeaveRequestListCreateView(generics.ListCreateAPIView):
    serializer_class = LeaveRequestSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.role == 'employee':
                try:
                    employee = Employee.objects.get(user=self.request.user)
                    return LeaveRequest.objects.filter(employee=employee)
                except Employee.DoesNotExist:
                    return LeaveRequest.objects.none()
            elif user_profile.role == 'owner' and user_profile.company:
                return LeaveRequest.objects.filter(employee__company=user_profile.company)
            return LeaveRequest.objects.none()
        except UserProfile.DoesNotExist:
            return LeaveRequest.objects.none()
    
    def perform_create(self, serializer):
        try:
            employee = Employee.objects.get(user=self.request.user)
            serializer.save(employee=employee)
        except Employee.DoesNotExist:
            raise ValidationError("Employee profile not found")

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def approve_leave(request, leave_id):
    try:
        user_profile = UserProfile.objects.get(user=request.user)
        if user_profile.role != 'owner':
            return Response({'error': 'Only owners can approve leaves'}, status=status.HTTP_403_FORBIDDEN)
        
        leave_request = LeaveRequest.objects.get(id=leave_id, employee__company=user_profile.company)
        action = request.data.get('action')  # 'approve' or 'reject'
        comments = request.data.get('comments', '')
        
        if action == 'approve':
            leave_request.status = 'approved'
        elif action == 'reject':
            leave_request.status = 'rejected'
        else:
            return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)
        
        leave_request.approved_by = request.user
        leave_request.approved_date = timezone.now()
        leave_request.comments = comments
        leave_request.save()
        
        serializer = LeaveRequestSerializer(leave_request)
        return Response(serializer.data)
    
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
    except LeaveRequest.DoesNotExist:
        return Response({'error': 'Leave request not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Schedule Views
class ScheduleListCreateView(generics.ListCreateAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.role == 'employee':
                try:
                    employee = Employee.objects.get(user=self.request.user)
                    return Schedule.objects.filter(employee=employee)
                except Employee.DoesNotExist:
                    return Schedule.objects.none()
            elif user_profile.role == 'owner' and user_profile.company:
                return Schedule.objects.filter(employee__company=user_profile.company)
            return Schedule.objects.none()
        except UserProfile.DoesNotExist:
            return Schedule.objects.none()
    
    def perform_create(self, serializer):
        try:
            employee = Employee.objects.get(user=self.request.user)
            serializer.save(employee=employee)
        except Employee.DoesNotExist:
            raise ValidationError("Employee profile not found")

class ScheduleDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        try:
            user_profile = UserProfile.objects.get(user=self.request.user)
            if user_profile.role == 'employee':
                try:
                    employee = Employee.objects.get(user=self.request.user)
                    return Schedule.objects.filter(employee=employee)
                except Employee.DoesNotExist:
                    return Schedule.objects.none()
            elif user_profile.role == 'owner' and user_profile.company:
                return Schedule.objects.filter(employee__company=user_profile.company)
            return Schedule.objects.none()
        except UserProfile.DoesNotExist:
            return Schedule.objects.none()

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def employee_visits(request, employee_id):
    try:
        employee = Employee.objects.get(id=employee_id)
        visits = Visit.objects.filter(employee=employee)
        serializer = VisitSerializer(visits, many=True)
        return Response(serializer.data)
    except Employee.DoesNotExist:
        return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_stats(request):
    try:
        user_profile = UserProfile.objects.get(user=request.user)
        
        if user_profile.role == 'employee':
            try:
                employee = Employee.objects.get(user=request.user)
                visits = Visit.objects.filter(employee=employee)
                schedules = Schedule.objects.filter(employee=employee)
                attendance = Attendance.objects.filter(employee=employee)
                
                stats = {
                    'total_visits': visits.count(),
                    'completed_visits': visits.filter(status='completed').count(),
                    'pending_visits': visits.filter(status='scheduled').count(),
                    'total_schedules': schedules.count(),
                    'attendance_rate': 0
                }
                
                if attendance.count() > 0:
                    present_days = attendance.filter(status='present').count()
                    stats['attendance_rate'] = round((present_days / attendance.count()) * 100, 2)
                
                return Response(stats)
            except Employee.DoesNotExist:
                return Response({'error': 'Employee profile not found'}, status=status.HTTP_404_NOT_FOUND)
        elif user_profile.role == 'owner' and user_profile.company:
            employees = Employee.objects.filter(company=user_profile.company)
            visits = Visit.objects.filter(employee__company=user_profile.company)
            products = Product.objects.filter(company=user_profile.company)
            organizations = Organization.objects.filter(company=user_profile.company)
            
            stats = {
                'total_employees': employees.count(),
                'total_visits': visits.count(),
                'total_products': products.count(),
                'total_organizations': organizations.count(),
                'completed_visits': visits.filter(status='completed').count(),
                'pending_visits': visits.filter(status='scheduled').count()
            }
            
            return Response(stats)
        
        return Response({'error': 'Invalid user role or no company associated'}, status=status.HTTP_400_BAD_REQUEST)
    
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)