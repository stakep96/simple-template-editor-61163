import React from 'react';
import { useSiteEditor } from '@/contexts/SiteEditorContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';
import type { PortfolioConfig, PortfolioProject } from '@/contexts/SiteEditorContext';

interface PortfolioEditorProps {
  instanceId: string;
}

const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ instanceId }) => {
  const { config, updateModuleInstance } = useSiteEditor();
  const instance = config.moduleInstances[instanceId];
  
  if (!instance || instance.type !== 'portfolio') return null;
  
  const portfolioConfig = instance.config as PortfolioConfig;

  const handleTitleChange = (value: string) => {
    updateModuleInstance(instanceId, {
      title: value,
    });
  };

  const handleAddProject = () => {
    const newProject: PortfolioProject = {
      id: `project-${Date.now()}`,
      image: '',
      title: '',
      description: '',
      tags: [],
    };

    updateModuleInstance(instanceId, {
      projects: [...(portfolioConfig.projects || []), newProject],
    });
  };

  const handleUpdateProject = (projectId: string, field: keyof PortfolioProject, value: any) => {
    const updatedProjects = portfolioConfig.projects.map((project) =>
      project.id === projectId ? { ...project, [field]: value } : project
    );

    updateModuleInstance(instanceId, {
      projects: updatedProjects,
    });
  };

  const handleRemoveProject = (projectId: string) => {
    const updatedProjects = portfolioConfig.projects.filter(
      (project) => project.id !== projectId
    );

    updateModuleInstance(instanceId, {
      projects: updatedProjects,
    });
  };

  const handleTagsChange = (projectId: string, tagsString: string) => {
    const tags = tagsString
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    
    handleUpdateProject(projectId, 'tags', tags);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Título da Seção</Label>
        <Input
          value={portfolioConfig.title || ''}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Portfolio"
        />
      </div>

      <div className="space-y-4">
        <Label className="text-base">Projetos</Label>
        
        {portfolioConfig.projects && portfolioConfig.projects.length > 0 ? (
          <div className="space-y-4">
            {portfolioConfig.projects.map((project, index) => (
              <Card key={project.id} className="p-4 relative">
                <button
                  onClick={() => handleRemoveProject(project.id)}
                  className="absolute top-2 right-2 p-2 hover:bg-destructive/10 rounded-full transition-colors z-10"
                  title="Remover projeto"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>

                <div className="space-y-4">
                  <div>
                    <Label>Imagem do Projeto {index + 1}</Label>
                    <ImageUpload
                      value={project.image}
                      onChange={(url) => handleUpdateProject(project.id, 'image', url)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Título</Label>
                    <Input
                      value={project.title}
                      onChange={(e) => handleUpdateProject(project.id, 'title', e.target.value)}
                      placeholder="Nome do projeto"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Tags (separadas por vírgula)</Label>
                    <Input
                      type="text"
                      value={project.tags?.join(', ') || ''}
                      onChange={(e) => handleTagsChange(project.id, e.target.value)}
                      placeholder="Design, UX, Mobile"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Descrição</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                      placeholder="Descreva o projeto, objetivos, resultados..."
                      className="mt-2 min-h-[120px]"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhum projeto adicionado ainda
          </p>
        )}

        <Button
          variant="outline"
          onClick={handleAddProject}
          className="w-full border-dashed hover:border-solid"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Novo Projeto
        </Button>
      </div>
    </div>
  );
};

export default PortfolioEditor;
