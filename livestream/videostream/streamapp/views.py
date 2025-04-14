from django.shortcuts import render
def livestream(request):
    return render(request, 'streamapp/livestream.html')
