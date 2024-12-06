'use client';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { SparklesCore } from '@/app/components/ui/sparkles';
import { PlusCircle } from 'lucide-react';

interface Task {
  id: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface DragResult {
  draggableId: string;
  type: string;
  source: {
    index: number;
    droppableId: string;
  };
  destination: {
    index: number;
    droppableId: string;
  } | null;
  reason: 'DROP' | 'CANCEL';
}

const KanbanPage = () => {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'À faire',
      tasks: [
        { id: '1', content: 'Tâche 1', priority: 'high' },
        { id: '2', content: 'Tâche 2', priority: 'medium' },
      ],
    },
    {
      id: 'in-progress',
      title: 'En cours',
      tasks: [],
    },
    {
      id: 'done',
      title: 'Terminé',
      tasks: [],
    },
  ]);

  const onDragEnd = (result: DragResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const newColumns = [...columns];
    
    const sourceColumn = newColumns.find(col => col.id === source.droppableId);
    const destColumn = newColumns.find(col => col.id === destination.droppableId);
    
    if (sourceColumn && destColumn) {
      const [removed] = sourceColumn.tasks.splice(source.index, 1);
      destColumn.tasks.splice(destination.index, 0, removed);
      setColumns(newColumns);
    }
  };

  return (
    <div className="p-6 h-full">
      <h1 className="text-2xl font-bold mb-6">Tableau Kanban</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {columns.map(column => (
            <div key={column.id} className="flex-1 max-w-md">
              <div className="bg-card rounded-2xl border shadow-sm p-4 relative">
                <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
                  <SparklesCore 
                    className="w-full h-full"
                    background="rgba(244,242,255,0.015)"
                    particleColor="#8b5cf6"
                    particleDensity={100}
                    speed={0.5}
                    minSize={0.6}
                    maxSize={1.4}
                    particleSize={1}
                  />
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">{column.title}</h2>
                    <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                      <PlusCircle className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="min-h-[200px] space-y-3"
                      >
                        {column.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/10 
                                         hover:scale-[1.02] transition-all duration-200 
                                         shadow-[0_4px_20px_-1px_rgba(147,51,234,0.1)] 
                                         hover:shadow-[0_4px_20px_-1px_rgba(147,51,234,0.2)]"
                              >
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${
                                    task.priority === 'high' ? 'bg-red-500' :
                                    task.priority === 'medium' ? 'bg-yellow-500' :
                                    'bg-green-500'
                                  }`} />
                                  {task.content}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanPage;
