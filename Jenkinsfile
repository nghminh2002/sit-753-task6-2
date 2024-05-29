pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
        imageName = "millynguyen/milly-test"
        registryCredential = 'millydocker'
        dockerImage = ''
    }
    stages {
        stage('Build') {
            agent any
            steps {
                script {
                    dockerImage = docker.build imageName
                }
            }
        }
        stage('Test') {
            steps {
                sh 'npm install'
                echo "run unit tests with Jest"
                sh 'npm run test'
                echo "code analysis with Eslint"
                sh 'npm run lint'
            }
        }
        stage('Deploy Image') {
            agent any
            steps {
                script {
                    docker.withDockerRegistry("https://registry.hub.docker.com", registryCredential) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                echo 'security scan with SonarCloud.'
            }
        }
        stage('Deploy') {
            steps {
                echo "deploy to staging with AWS EC2"
            }
        }
        stage('Release') {
            steps {
                echo "deploy to production with AWS EC2"
            }
        }
    }
}