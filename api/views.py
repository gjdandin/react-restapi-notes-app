from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Note
from .serializers import NoteSerializer
from .utils import *
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.
@api_view(['GET']) # sets it as a rest framework view
def getRoutes(request):
    """Sets up api routes and returns the api routes on django rest framework"""

    routes = [
        {
            'Endpoint': '/notes/',
            'method': ['GET', 'POST'],
            'body': {'body': ""},
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': ['GET', 'PUT', 'POST', 'DELETE'],
            'body': {'body': ""},
            'description': 'Returns a single note object'
        },
        """
            {
                'Endpoint': '/notes/',
                'method': 'POST',
                'body': {'body': ""},
                'description': 'Creates new note with data sent in post request'
            },
            
                {
                    'Endpoint': '/notes/id/update/',
                    'method': 'PUT',
                    'body': {'body': ""},
                    'description': 'Creates an existing note with data sent in post request'
                },
                {
                    'Endpoint': '/notes/id/delete/',
                    'method': 'DELETE',
                    'body': None,
                    'description': 'Deletes and exiting note'
                },
            """
    ]

@api_view(['GET', 'POST']) # sets it as a rest framework view
def getNotes(request):
    if request.method == 'GET':
        return getNotesList(request)

    if request.method == 'POST':
        return createNote(request)

@api_view(['GET', 'POST', 'PUT', 'DELETE']) # sets it as a rest framework view
def getNote(request, pk):
    if request.method == 'GET':
        return getNoteDetail(request, pk)

    if request.method == 'PUT':
        return updateNote(request, pk)

    if request.method == 'DELETE':
        return deleteNote(request, pk)


""""@api_view(['POST']) #POST for creating new entries
def createNote(request):
    data = request.data #Take the data
    note = Note.objects.create( #Create the note
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False) #serialize it
    return Response(serializer.data) #return to frontend as json


@api_view(['PUT']) # Put is for updating items
def updateNote(request, pk):
    data = request.data #Json with the new note body
    note = Note.objects.get(id=pk)

    serializer = NoteSerializer(instance=note, data=data, many=False)
    #instance of the serializer is the note, which note to update with what data = data.

    if serializer.is_valid(): #check that the data is compatible and saveable.
        serializer.save() #function of django model forms.

    return Response(serializer.data)

@api_view(['DELETE']) # Put is for updating items
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('note was deleted.')
"""