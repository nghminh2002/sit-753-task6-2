pipeline {
    agent any
    tools {nodejs "nodejs"}
    environment {
        registryCredential = 'millynguyen'
        dockerImage = ''
    }
    stages {
        stage('Build') {
            agent any
            steps {
                script {
                    dockerImage = docker.build("millynguyen/milly-test:${env.BUILD_ID}")
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
                    docker.withRegistry("https://registry.hub.docker.com", 'millydocker') {
                        dockerImage.push()
                    }
                sh "docker rmi -f millynguyen/milly-test:${env.BUILD_ID}"
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