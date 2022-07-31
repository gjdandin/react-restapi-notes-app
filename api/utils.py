from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

def getNotesList(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)  # Have to serialize and jsonify these python Note objects
    return Response(serializer.data)  # Much like a json, have to .data
    # Many parameter is for choosing single instance or all Note instances serialized

def createNote(request):
    data = request.data  # Take the data
    note = Note.objects.create(  # Create the note
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)  # serialize it
    return Response(serializer.data)  # return to frontend as json

def getNoteDetail(request, pk):
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializer(notes, many=False)
    return Response(serializer.data)

def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return serializer.data

def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')